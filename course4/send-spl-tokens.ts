import { Connection } from "@solana/web3.js";
import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, mintTo, transfer } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
const user = getKeypairFromEnvironment("SECRET_KEY");


const RECIPIENT_ADDRESS = "AjSSsjFAWhxEHgJRQom65Rnf55YoKRZmVixGVk5F44Ee"
const TOKEN_MINT_ADDRESS = "5JzbhcGCCKYwEuYQejTR2vwGakt7zJU5imNEXhMXhWc7"
const recipient = new PublicKey(RECIPIENT_ADDRESS);
const mint = new PublicKey(TOKEN_MINT_ADDRESS);

const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, user, mint, recipient);

// const link = getExplorerLink("address", tokenAccount.address.toBase58(), "devnet");

const mintTxSig = await mintTo(connection, user, mint, tokenAccount.address, user, 1000000000);

const link = getExplorerLink("tx", mintTxSig, "devnet");

const transferSig = await transfer(connection, user, tokenAccount.address, recipient, user, 1000000000);