import { getExplorerLink, getKeypairFromEnvironment } from '@solana-developers/helpers';
import {Connection, PublicKey, Transaction, TransactionInstruction} from '@solana/web3.js';
import { createMint} from "@solana/spl-token"
import "dotenv/config";

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log("Loaded owner account", user.publicKey.toBase58());

const mintAccount = await createMint(
    connection,
    user,
    user.publicKey,
    null,
    2,
);
console.log("Mint account created", mintAccount.toBase58());
const link = getExplorerLink("address", mintAccount.toBase58(), "devnet");