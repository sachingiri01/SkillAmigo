import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import pool from "../../db"; // adjust if db file path differs

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET_KEY,
  callbacks: {
    async jwt({ token, account, profile }) {
      

      if (!token.email) return token;

      // check user
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE email = $1 LIMIT 1",
        [token.email]
      );

      if (rows.length === 0) {
        // insert new user
        const result = await pool.query(
          `INSERT INTO users (
            name, email, phone, profile_picture, bio, merit_credits, is_verified, role
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING user_id,phone, name, email,bio, profile_picture, role, is_verified, merit_credits`,
          [
            token.name || profile?.name || "Unnamed",
            token.email,
            null,
            token.picture || null,
            null,
            0,
            false,
            "user",
          ]
        );
        token.id = result.rows[0].user_id;
        token.phone = result.rows[0].phone;
        token.merit_credits = result.rows[0].merit_credits;
        token.is_verified = result.rows[0].is_verified;
        token.profile_picture=result.rows[0].profile_picture;
        token.role=result.rows[0].role;
        token.bio=result.rows[0].bio;
      } else {
        token.id = rows[0].user_id;
        token.phone = rows[0].phone;
        token.merit_credits = rows[0].merit_credits;
        token.is_verified = rows[0].is_verified;
        token.profile_picture=rows[0].profile_picture;
        token.role=rows[0].role;
        token.bio=rows[0].bio;

      }
       
      return token;
    },

    async session({ session, token }) {
      
      session.user.id = token.id;
      session.user.phone = token.phone;
      session.user.merit_credits = token.merit_credits;
      session.user.is_verified = token.is_verified;
      session.user.profile_picture=token.profile_picture;
      session.user.image = token.profile_picture || null;
      session.user.bio=token.bio;
      console.log("final session",session);
     
     
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
