use anchor_lang::prelude::*;

#[account]
pub struct Factory {
    pub admin: Pubkey,
    pub usdt_mint: Pubkey,
    pub pool_count: u64,
    pub bump: u8,
}

impl Factory {
    pub const INIT_SPACE: usize = 32 + 32 + 8 + 1;
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum PoolStateKind {
    Funding = 0,
    Succeeded = 1,
    Failed = 2,
    Released = 3,
}

impl From<u8> for PoolStateKind {
    fn from(v: u8) -> Self {
        match v { 1 => Self::Succeeded, 2 => Self::Failed, 3 => Self::Released, _ => Self::Funding }
    }
}

#[account]
pub struct Pool {
    pub factory: Pubkey,
    pub company_wallet: Pubkey,
    pub share_mint: Pubkey,
    pub usdt_vault: Pubkey,
    pub target_amount: u64,
    pub deadline: i64,
    pub success_return_bps: u16,
    pub fail_return_bps: u16,
    pub token_price: u64,
    pub mint_decimals: u8,
    pub state: u8,
    pub finalized: bool,
    pub success_payout_active: bool,
    pub fail_payout_active: bool,
    pub total_invested: u64,
    pub index: u64,
    pub bump: u8,
}

impl Pool {
    pub const INIT_SPACE: usize = 32 + 32 + 32 + 32 + 8 + 8 + 2 + 2 + 8 + 1 + 1 + 1 + 1 + 8 + 8 + 1;
}
