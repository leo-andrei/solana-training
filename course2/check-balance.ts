import "dotenv/config"
import { Connection,LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import bs58 from "bs58";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("✅ Connected to the cluster");
console.log("devnet url", clusterApiUrl("devnet"));

const keypair = getKeypairFromEnvironment("SECRET_KEY");
const myKey = keypair.publicKey.toBase58();
const publicKey = new PublicKey(myKey);

const balanceInLamport = await connection.getBalance(publicKey);
var balanceInSol = balanceInLamport / LAMPORTS_PER_SOL;

console.log(`The balance of ${keypair} is ${balanceInSol} sol`);