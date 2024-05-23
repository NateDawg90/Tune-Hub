// lib/lucia.ts
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import lucia from "lucia";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
await client.connect();
const db = client.db();

export const auth = lucia({
  adapter: MongodbAdapter(db),
  env: process.env.NODE_ENV === "production" ? "PROD" : "DEV",
  generateSecret: () => crypto.randomUUID(),
});

export type Auth = typeof auth;
