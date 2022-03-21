import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";
// import { FaunaAdapter } from "@next-auth/fauna-adapter";

export default NextAuth({
  debug: true,
  // secret: "yYEAJjoEZq+FEz/cwhX2M0KUctKcOQO8R0I+SN/ukyo=",
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
  // adapter: FaunaAdapter(Client),
  callbacks: {
    async signIn({ account, profile, user, credentials }) {
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index("user_by_email"), q.Casefold(user.email))
              )
            ),
            q.Create(q.Collection("users"), { data: { email: user.email } }),
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))
          )
        );

        return true;
      } catch (error) {
        console.error("error => ", error);
        return false;
      }
    },
  },
});
