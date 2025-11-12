// db.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.DATABASE;
if (!uri) throw new Error("Falta la variable de entorno DATABASE en .env");

const client = new MongoClient(uri, {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
});

let db = null;

export async function connectToDatabase(dbName = "moviesDB") {
  if (db) return db; // ya conectado
  await client.connect();
  db = client.db(dbName);
  console.log("✅ Connected to MongoDB Atlas:", dbName);
  return db;
}

export function getDb() {
  if (!db) throw new Error("Llama a connectToDatabase primero");
  return db;
}

// Cerrar limpieza al terminar el proceso (opcional pero recomendable)
process.on("SIGINT", async () => {
  try {
    await client.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
