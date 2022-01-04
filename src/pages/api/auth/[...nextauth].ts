import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { query as q, Client as FaunaClient } from "faunadb";
import { FaunaAdapter } from "@next-auth/fauna-adapter";
// import { fauna } from "../../../services/fauna";

const Client = new FaunaClient({
  secret: process.env.FAUNA_KEY,
  // domain: "db.fauna.com",
});

export default NextAuth({
  debug: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
  ],
  adapter: FaunaAdapter(Client),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
        console.log("LOGIN SUCCESS", account);
        // await fauna.query(
        //   q.Create(q.Collection("users"), {
        //     data: {
        //       email: email,
        //     },
        //   })
        // );
        return true;
    },
  },
});
