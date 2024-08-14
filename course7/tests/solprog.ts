import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Solprog } from "../target/types/solprog";
import { assert } from "chai";
const web3 = anchor.web3;

// describe("solprog", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.Solprog as Program<Solprog>;

//   it("Is initialized!", async () => {
//     // Add your test here.
//     const tx = await program.methods.initialize().rpc();
//     console.log("Your transaction signature", tx);
//   });
// });
describe("Favorites", () => {
  // Use the cluster and the keypair specified in Anchor.toml
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const user = (provider.wallet as anchor.Wallet).payer;
  const program = anchor.workspace.Favorites as Program<Solprog>;
  // You can skip this 'before' section if you're busy!
  // We don't need to airdrop if we're using the local cluster
  // because the local cluster gives us 85 billion dollars worth of SOL
  before(async () => {
    const balance = await provider.connection.getBalance(user.publicKey);
    const balanceInSOL = balance / web3.LAMPORTS_PER_SOL;
    const formattedBalance = new Intl.NumberFormat().format(balanceInSOL);
    console.log(`Balance: ${formattedBalance} SOL`);
  });
});
