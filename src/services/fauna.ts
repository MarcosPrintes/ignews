import { Client as FaunaClient } from "faunadb";

export const fauna = new FaunaClient({
  secret: process.env.FAUNADB_KEY,
  domain: "db.fauna.com",
});
