use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, MintTo, Token, TokenAccount, Transfer, Burn};
use crate::state::*;
use crate::errors::*;

pub fn initialize_factory(ctx: Context<InitializeFactory>, admin: Pubkey, usdt_mint: Pubkey) -> Result<()> {
    let factory = &mut ctx.accounts.factory;
    factory.admin = admin;
    factory.usdt_mint = usdt_mint;
    factory.pool_count = 0;
    factory.bump = ctx.bumps.factory;
    Ok(())
}

#[derive(Accounts)]
pub struct InitializeFactory<'info> {
    #[account(
        init,
        payer = payer,
        seeds = [b"factory"],
        bump,
        space = 8 + Factory::INIT_SPACE
    )]
    pub factory: Account<'info, Factory>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn create_pool(
    ctx: Context<CreatePool>,
    company_wallet: Pubkey,
    target_amount: u64,
    deadline: i64,
    success_return_bps: u16,
    fail_return_bps: u16,
    token_price: u64,
) -> Result<()> {
    let factory = &mut ctx.accounts.factory;
    let pool = &mut ctx.accounts.pool;
    let share_mint = &mut ctx.accounts.share_mint;
    let usdt_vault = &mut ctx.accounts.usdt_vault;
    pool.factory = factory.key();
    pool.company_wallet = company_wallet;
    pool.share_mint = share_mint.key();
    pool.usdt_vault = usdt_vault.key();
    pool.target_amount = target_amount;
    pool.deadline = deadline;
    pool.success_return_bps = success_return_bps;
    pool.fail_return_bps = fail_return_bps;
    pool.token_price = token_price;
    pool.mint_decimals = 18;
    pool.state = PoolStateKind::Funding as u8;
    pool.finalized = false;
    pool.success_payout_active = false;
    pool.fail_payout_active = false;
    pool.total_invested = 0;
    pool.index = factory.pool_count;
    pool.bump = ctx.bumps.pool;
    factory.pool_count = factory.pool_count.checked_add(1).unwrap();
    Ok(())
}

#[derive(Accounts)]
pub struct CreatePool<'info> {
    #[account(mut, seeds = [b"factory"], bump = factory.bump)]
    pub factory: Account<'info, Factory>,
    #[account(
        init,
        payer = payer,
        seeds = [b"pool", factory.key().as_ref(), &factory.pool_count.to_le_bytes()],
        bump,
        space = 8 + Pool::INIT_SPACE
    )]
    pub pool: Account<'info, Pool>,
    #[account(
        init,
        payer = payer,
        seeds = [b"share_mint", pool.key().as_ref()],
        bump,
        mint::decimals = 18,
        mint::authority = pool,
        mint::freeze_authority = pool
    )]
    pub share_mint: Account<'info, Mint>,
    #[account(address = factory.usdt_mint)]
    pub usdt_mint: Account<'info, Mint>,
    #[account(
        init,
        payer = payer,
        seeds = [b"usdt_vault", pool.key().as_ref()],
        bump,
        token::mint = usdt_mint,
        token::authority = pool
    )]
    pub usdt_vault: Account<'info, TokenAccount>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

pub fn invest(ctx: Context<Invest>, amount: u64) -> Result<()> {
    require!(amount > 0, UmayError::InsufficientFunds);
    let pool_ref = &ctx.accounts.pool;
    let clock = Clock::get()?;
    require!(PoolStateKind::from(pool_ref.state) == PoolStateKind::Funding, UmayError::NotFunding);
    require!(clock.unix_timestamp < pool_ref.deadline, UmayError::DeadlinePassed);
    let cpi_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.investor_usdt.to_account_info(),
            to: ctx.accounts.usdt_vault.to_account_info(),
            authority: ctx.accounts.investor.to_account_info(),
        },
    );
    token::transfer(cpi_ctx, amount)?;
    let tokens_to_mint = amount as u128 * 10u128.pow(pool_ref.mint_decimals as u32) / pool_ref.token_price as u128;
    let tokens_to_mint_u64 = u64::try_from(tokens_to_mint).unwrap();
    let factory_key = ctx.accounts.factory.key();
    let index_le = pool_ref.index.to_le_bytes();
    let seeds: &[&[u8]] = &[
        b"pool",
        factory_key.as_ref(),
        index_le.as_ref(),
        &[pool_ref.bump],
    ];
    let signer: &[&[&[u8]]] = &[seeds];
    let cpi_ctx_mint = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        MintTo {
            mint: ctx.accounts.share_mint.to_account_info(),
            to: ctx.accounts.investor_share.to_account_info(),
            authority: ctx.accounts.pool.to_account_info(),
        },
        signer,
    );
    token::mint_to(cpi_ctx_mint, tokens_to_mint_u64)?;
    let pool = &mut ctx.accounts.pool;
    pool.total_invested = pool.total_invested.checked_add(amount).unwrap();
    Ok(())
}

#[derive(Accounts)]
pub struct Invest<'info> {
    #[account(seeds = [b"factory"], bump = factory.bump)]
    pub factory: Account<'info, Factory>,
    #[account(mut, seeds = [b"pool", factory.key().as_ref(), &pool.index.to_le_bytes()], bump = pool.bump)]
    pub pool: Account<'info, Pool>,
    #[account(mut, seeds = [b"share_mint", pool.key().as_ref()], bump)]
    pub share_mint: Account<'info, Mint>,
    #[account(mut, seeds = [b"usdt_vault", pool.key().as_ref()], bump)]
    pub usdt_vault: Account<'info, TokenAccount>,
    #[account(mut)]
    pub investor: Signer<'info>,
    #[account(mut, constraint = investor_usdt.mint == factory.usdt_mint, constraint = investor_usdt.owner == investor.key())]
    pub investor_usdt: Account<'info, TokenAccount>,
    #[account(mut, constraint = investor_share.mint == share_mint.key(), constraint = investor_share.owner == investor.key())]
    pub investor_share: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

pub fn finalize(ctx: Context<Finalize>) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    pool.finalized = true;
    pool.state = if pool.total_invested >= pool.target_amount { PoolStateKind::Succeeded as u8 } else { PoolStateKind::Failed as u8 };
    Ok(())
}

#[derive(Accounts)]
pub struct Finalize<'info> {
    #[account(seeds = [b"factory"], bump = factory.bump)]
    pub factory: Account<'info, Factory>,
    #[account(mut, seeds = [b"pool", factory.key().as_ref(), &pool.index.to_le_bytes()], bump = pool.bump, has_one = factory)]
    pub pool: Account<'info, Pool>,
}

pub fn release_to_company(ctx: Context<ReleaseToCompany>) -> Result<()> {
    let pool_ref = &ctx.accounts.pool;
    require!(pool_ref.finalized, UmayError::InvalidState);
    require!(PoolStateKind::from(pool_ref.state) == PoolStateKind::Succeeded, UmayError::InvalidState);
    let amount = ctx.accounts.usdt_vault.amount;
    require!(amount > 0, UmayError::InsufficientFunds);
    let factory_key = ctx.accounts.factory.key();
    let index_le = pool_ref.index.to_le_bytes();
    let seeds: &[&[u8]] = &[
        b"pool",
        factory_key.as_ref(),
        index_le.as_ref(),
        &[pool_ref.bump],
    ];
    let signer: &[&[&[u8]]] = &[seeds];
    let cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.usdt_vault.to_account_info(),
            to: ctx.accounts.company_usdt.to_account_info(),
            authority: ctx.accounts.pool.to_account_info(),
        },
        signer,
    );
    token::transfer(cpi_ctx, amount)?;
    let pool = &mut ctx.accounts.pool;
    pool.state = PoolStateKind::Released as u8;
    Ok(())
}

#[derive(Accounts)]
pub struct ReleaseToCompany<'info> {
    #[account(seeds = [b"factory"], bump = factory.bump)]
    pub factory: Account<'info, Factory>,
    #[account(mut, seeds = [b"pool", factory.key().as_ref(), &pool.index.to_le_bytes()], bump = pool.bump, has_one = factory)]
    pub pool: Account<'info, Pool>,
    #[account(mut, seeds = [b"usdt_vault", pool.key().as_ref()], bump)]
    pub usdt_vault: Account<'info, TokenAccount>,
    #[account(mut, constraint = company_usdt.mint == factory.usdt_mint, constraint = company_usdt.owner == pool.company_wallet)]
    pub company_usdt: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

pub fn refund(ctx: Context<Refund>) -> Result<()> {
    let pool = &ctx.accounts.pool;
    let token_amt = ctx.accounts.investor_share.amount;
    require!(token_amt > 0, UmayError::InsufficientFunds);
    let refund_amount = (token_amt as u128 * pool.token_price as u128) / 10u128.pow(pool.mint_decimals as u32);
    let refund_u64 = u64::try_from(refund_amount).unwrap();
    let burn_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        Burn {
            mint: ctx.accounts.share_mint.to_account_info(),
            from: ctx.accounts.investor_share.to_account_info(),
            authority: ctx.accounts.investor.to_account_info(),
        },
    );
    token::burn(burn_ctx, token_amt)?;
    let factory_key = ctx.accounts.factory.key();
    let index_le = pool.index.to_le_bytes();
    let seeds: &[&[u8]] = &[
        b"pool",
        factory_key.as_ref(),
        index_le.as_ref(),
        &[pool.bump],
    ];
    let signer: &[&[&[u8]]] = &[seeds];
    let transfer_ctx = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.usdt_vault.to_account_info(),
            to: ctx.accounts.investor_usdt.to_account_info(),
            authority: ctx.accounts.pool.to_account_info(),
        },
        signer,
    );
    token::transfer(transfer_ctx, refund_u64)?;
    Ok(())
}

#[derive(Accounts)]
pub struct Refund<'info> {
    #[account(seeds = [b"factory"], bump = factory.bump)]
    pub factory: Account<'info, Factory>,
    #[account(seeds = [b"pool", factory.key().as_ref(), &pool.index.to_le_bytes()], bump = pool.bump)]
    pub pool: Account<'info, Pool>,
    #[account(mut, seeds = [b"usdt_vault", pool.key().as_ref()], bump)]
    pub usdt_vault: Account<'info, TokenAccount>,
    #[account(mut)]
    pub investor: Signer<'info>,
    #[account(mut, constraint = investor_usdt.mint == factory.usdt_mint, constraint = investor_usdt.owner == investor.key())]
    pub investor_usdt: Account<'info, TokenAccount>,
    #[account(mut, seeds = [b"share_mint", pool.key().as_ref()], bump)]
    pub share_mint: Account<'info, Mint>,
    #[account(mut, constraint = investor_share.mint == share_mint.key(), constraint = investor_share.owner == investor.key())]
    pub investor_share: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

pub fn deposit_usdt(ctx: Context<DepositUsdt>, amount: u64) -> Result<()> {
    let cpi_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.admin_usdt.to_account_info(),
            to: ctx.accounts.usdt_vault.to_account_info(),
            authority: ctx.accounts.admin.to_account_info(),
        },
    );
    token::transfer(cpi_ctx, amount)?;
    Ok(())
}

#[derive(Accounts)]
pub struct DepositUsdt<'info> {
    #[account(seeds = [b"factory"], bump = factory.bump, constraint = factory.admin == admin.key())]
    pub factory: Account<'info, Factory>,
    #[account(seeds = [b"pool", factory.key().as_ref(), &pool.index.to_le_bytes()], bump = pool.bump)]
    pub pool: Account<'info, Pool>,
    #[account(mut, seeds = [b"usdt_vault", pool.key().as_ref()], bump)]
    pub usdt_vault: Account<'info, TokenAccount>,
    pub admin: Signer<'info>,
    #[account(mut, constraint = admin_usdt.mint == factory.usdt_mint, constraint = admin_usdt.owner == admin.key())]
    pub admin_usdt: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

pub fn set_success_payout_active(ctx: Context<ToggleScenario>, active: bool) -> Result<()> {
    ctx.accounts.pool.success_payout_active = active;
    Ok(())
}

pub fn set_fail_payout_active(ctx: Context<ToggleScenario>, active: bool) -> Result<()> {
    ctx.accounts.pool.fail_payout_active = active;
    Ok(())
}

#[derive(Accounts)]
pub struct ToggleScenario<'info> {
    #[account(seeds = [b"factory"], bump = factory.bump, constraint = factory.admin == admin.key())]
    pub factory: Account<'info, Factory>,
    #[account(mut, seeds = [b"pool", factory.key().as_ref(), &pool.index.to_le_bytes()], bump = pool.bump)]
    pub pool: Account<'info, Pool>,
    pub admin: Signer<'info>,
}

pub fn redeem_by_scenario(ctx: Context<RedeemByScenario>, scenario: u8, token_amount: Option<u64>) -> Result<()> {
    let pool = &ctx.accounts.pool;
    let burn_amount = token_amount.unwrap_or(ctx.accounts.investor_share.amount);
    if burn_amount == 0 { return Err(UmayError::InsufficientFunds.into()); }
    let base = (burn_amount as u128 * pool.token_price as u128) / 10u128.pow(pool.mint_decimals as u32);
    let payout = match scenario { 0 => {
        require!(pool.success_payout_active, UmayError::InvalidScenario);
        base * pool.success_return_bps as u128 / 10_000u128
    }, 1 => {
        require!(pool.fail_payout_active, UmayError::InvalidScenario);
        base * pool.fail_return_bps as u128 / 10_000u128
    }, _ => return Err(UmayError::InvalidScenario.into()) };
    let payout_u64 = u64::try_from(payout).unwrap();
    require!(ctx.accounts.usdt_vault.amount >= payout_u64, UmayError::InsufficientFunds);
    let burn_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        Burn {
            mint: ctx.accounts.share_mint.to_account_info(),
            from: ctx.accounts.investor_share.to_account_info(),
            authority: ctx.accounts.investor.to_account_info(),
        },
    );
    token::burn(burn_ctx, burn_amount)?;
    let factory_key = ctx.accounts.factory.key();
    let index_le = pool.index.to_le_bytes();
    let seeds: &[&[u8]] = &[
        b"pool",
        factory_key.as_ref(),
        index_le.as_ref(),
        &[pool.bump],
    ];
    let signer: &[&[&[u8]]] = &[seeds];
    let transfer_ctx = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.usdt_vault.to_account_info(),
            to: ctx.accounts.investor_usdt.to_account_info(),
            authority: ctx.accounts.pool.to_account_info(),
        },
        signer,
    );
    token::transfer(transfer_ctx, payout_u64)?;
    Ok(())
}

#[derive(Accounts)]
pub struct RedeemByScenario<'info> {
    #[account(seeds = [b"factory"], bump = factory.bump)]
    pub factory: Account<'info, Factory>,
    #[account(seeds = [b"pool", factory.key().as_ref(), &pool.index.to_le_bytes()], bump = pool.bump)]
    pub pool: Account<'info, Pool>,
    #[account(mut, seeds = [b"usdt_vault", pool.key().as_ref()], bump)]
    pub usdt_vault: Account<'info, TokenAccount>,
    #[account(mut)]
    pub investor: Signer<'info>,
    #[account(mut, constraint = investor_usdt.mint == factory.usdt_mint, constraint = investor_usdt.owner == investor.key())]
    pub investor_usdt: Account<'info, TokenAccount>,
    #[account(mut, seeds = [b"share_mint", pool.key().as_ref()], bump)]
    pub share_mint: Account<'info, Mint>,
    #[account(mut, constraint = investor_share.mint == share_mint.key(), constraint = investor_share.owner == investor.key())]
    pub investor_share: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}
