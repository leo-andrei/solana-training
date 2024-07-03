import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL, SystemProgram, Transaction, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import { createMemoInstruction } from "@solana/spl-memo";

const sender = getKeypairFromEnvironment("SECRET_KEY");
var connection = new Connection(clusterApiUrl("devnet"));
console.log(`Sender public key: ${sender.publicKey.toBase58()}`);

const receiver = new PublicKey("E8fcsDTokKM6XvutFx48JnFh2a28DZJSJy8fgx8J8YpS");

const balanceInSol = await connection.getBalance(receiver);
console.log(`Receiverer balance: ${balanceInSol/ LAMPORTS_PER_SOL} SOL`);

const transaction = new Transaction()
const transferInstructions = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: receiver,
    lamports: 0.1 * LAMPORTS_PER_SOL,
    });

    transaction.add(transferInstructions);

const mesaj = "Mersi de solana"

const memoInstruction = createMemoInstruction(mesaj)
transaction.add(memoInstruction)

const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

console.log(`Transaction confirmed. Signature: ${signature}`);