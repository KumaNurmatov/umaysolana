use anchor_lang::prelude::*;

pub mod state;
pub mod errors;
pub mod instructions;

use instructions::*;

declare_id!("Umay1111111111111111111111111111111111111");

#[program]
pub mod umay {
    use super::*;

    pub fn initialize_factory(ctx: Context<InitializeFactory>, admin: Pubkey, usdt_mint: Pubkey) -> Result<()> {
        instructions::initialize_factory(ctx, admin, usdt_mint)
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
        instructions::create_pool(
            ctx,
            company_wallet,
            target_amount,
            deadline,
            success_return_bps,
            fail_return_bps,
            token_price,
        )
    }

    pub fn invest(ctx: Context<Invest>, amount: u64) -> Result<()> {
        instructions::invest(ctx, amount)
    }

    pub fn finalize(ctx: Context<Finalize>) -> Result<()> {
        instructions::finalize(ctx)
    }

    pub fn release_to_company(ctx: Context<ReleaseToCompany>) -> Result<()> {
        instructions::release_to_company(ctx)
    }

    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        instructions::refund(ctx)
    }

    pub fn deposit_usdt(ctx: Context<DepositUsdt>, amount: u64) -> Result<()> {
        instructions::deposit_usdt(ctx, amount)
    }

    pub fn set_success_payout_active(ctx: Context<ToggleScenario>, active: bool) -> Result<()> {
        instructions::set_success_payout_active(ctx, active)
    }

    pub fn set_fail_payout_active(ctx: Context<ToggleScenario>, active: bool) -> Result<()> {
        instructions::set_fail_payout_active(ctx, active)
    }

    pub fn redeem_by_scenario(ctx: Context<RedeemByScenario>, scenario: u8, token_amount: Option<u64>) -> Result<()> {
        instructions::redeem_by_scenario(ctx, scenario, token_amount)
    }
}
