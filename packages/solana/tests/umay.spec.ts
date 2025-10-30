import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Keypair, SystemProgram, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { expect } from "chai";

describe("umay", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const wallet = provider.wallet as anchor.Wallet;
  const program = anchor.workspace.Umay as Program;

  let factoryPda: PublicKey;
  let usdtMint: PublicKey;

  before(async () => {
    [factoryPda] = PublicKey.findProgramAddressSync([
      Buffer.from("factory"),
    ], program.programId);
    usdtMint = await createMint(
      provider.connection,
      (wallet.payer as any),
      wallet.publicKey,
      wallet.publicKey,
      6
    );
  });

  it("initialize_factory", async () => {
    await program.methods
      .initializeFactory(wallet.publicKey, usdtMint)
      .accounts({
        factory: factoryPda,
        payer: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
    const factory = await program.account.factory.fetch(factoryPda);
    expect(factory.admin.toBase58()).to.eq(wallet.publicKey.toBase58());
    expect(factory.usdtMint.toBase58()).to.eq(usdtMint.toBase58());
  });

  it("create_pool + invest + finalize", async () => {
    const factory = await program.account.factory.fetch(factoryPda);
    const poolIndex = factory.poolCount;
    const [poolPda] = PublicKey.findProgramAddressSync([
      Buffer.from("pool"),
      factoryPda.toBuffer(),
      Buffer.from(new anchor.BN(poolIndex.toString()).toArray("le", 8)),
    ], program.programId);
    const [shareMintPda] = PublicKey.findProgramAddressSync([
      Buffer.from("share_mint"),
      poolPda.toBuffer(),
    ], program.programId);
    const [usdtVaultPda] = PublicKey.findProgramAddressSync([
      Buffer.from("usdt_vault"),
      poolPda.toBuffer(),
    ], program.programId);

    const targetAmount = new anchor.BN(1_000_000);
    const deadline = new anchor.BN(Math.floor(Date.now() / 1000) + 3600);
    const successBps = 11000; // 110%
    const failBps = 8000;     // 80%
    const tokenPrice = new anchor.BN(1_000_000);

    await program.methods
      .createPool(
        wallet.publicKey,
        targetAmount,
        deadline,
        successBps,
        failBps,
        tokenPrice,
      )
      .accounts({
        factory: factoryPda,
        pool: poolPda,
        shareMint: shareMintPda,
        usdtMint: usdtMint,
        usdtVault: usdtVaultPda,
        payer: wallet.publicKey,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    const investorUsdt = await getOrCreateAssociatedTokenAccount(provider.connection, (wallet.payer as any), usdtMint, wallet.publicKey);
    await mintTo(provider.connection, (wallet.payer as any), usdtMint, investorUsdt.address, wallet.publicKey, 5_000_000);

    const investorShare = await getOrCreateAssociatedTokenAccount(provider.connection, (wallet.payer as any), shareMintPda, wallet.publicKey, true);

    await program.methods
      .invest(new anchor.BN(1_000_000))
      .accounts({
        factory: factoryPda,
        pool: poolPda,
        shareMint: shareMintPda,
        usdtVault: usdtVaultPda,
        investor: wallet.publicKey,
        investorUsdt: investorUsdt.address,
        investorShare: investorShare.address,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    await program.methods
      .finalize()
      .accounts({
        factory: factoryPda,
        pool: poolPda,
      })
      .rpc();

    const pool = await program.account.pool.fetch(poolPda);
    expect(pool.finalized).to.eq(true);
  });
});
