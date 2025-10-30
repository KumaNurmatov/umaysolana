use anchor_lang::prelude::*;
#[error_code]
pub enum UmayError {
    #[msg("Unauthorized")]
    Unauthorized,
    #[msg("Deadline passed")]
    DeadlinePassed,
    #[msg("Not funding")]
    NotFunding,
    #[msg("Invalid state")]
    InvalidState,
    #[msg("Insufficient funds")]
    InsufficientFunds,
    #[msg("Invalid scenario")]
    InvalidScenario,
}
