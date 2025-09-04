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
            name, email, phone, profile_picture, bio, merit_credits, is_verified, role,balance
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9)
          RETURNING user_id,phone, name, email,bio, profile_picture, role, is_verified, merit_credits,balance`,
          [
            token.name || profile?.name || "Unnamed",
            token.email,
            null,
            token.picture || null,
            null,
            0,
            false,
            "user",
            0,
          ]
        );
        token.id = result.rows[0].user_id;
        token.phone = result.rows[0].phone;
        token.merit_credits = result.rows[0].merit_credits;
        token.is_verified = result.rows[0].is_verified;
        token.profile_picture=result.rows[0].profile_picture;
        token.role=result.rows[0].role;
        token.bio=result.rows[0].bio;
        token.balance=result.rows[0].balance;
        token.name = result.rows[0].name;
        token.email = result.rows[0].email;
      } else {
        token.id = rows[0].user_id;
        token.phone = rows[0].phone;
        token.merit_credits = rows[0].merit_credits;
        token.is_verified = rows[0].is_verified;
        token.profile_picture=rows[0].profile_picture;
        token.role=rows[0].role;
        token.bio=rows[0].bio;
        token.balance=rows[0].balance;
        token.name = rows[0].name;
        token.email = rows[0].email;

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
      session.user.balance=token.balance;
      session.user.role=token.role;
      session.user.name = token.name;
      session.user.email = token.email;
      
     
      
      
   
     
     
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import pool from "../../db"; // adjust path to your db

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],

//   // Use JWT sessions
//   session: { strategy: "jwt" },

//   // IMPORTANT: must match FastAPI SECRET_KEY
//   secret: process.env.NEXTAUTH_SECRET,  

//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET, // explicit for clarity
//   },

//   callbacks: {
//     async jwt({ token, account, profile }) {
//       if (!token.email) return token;

//       // Check user in DB
//       const { rows } = await pool.query(
//         "SELECT * FROM users WHERE email = $1 LIMIT 1",
//         [token.email]
//       );

//       if (rows.length === 0) {
//         // Insert new user
//         const result = await pool.query(
//           `INSERT INTO users (
//             name, email, phone, profile_picture, bio, merit_credits, 
//             is_verified, role, balance
//           )
//           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//           RETURNING user_id, phone, name, email, bio, profile_picture, 
//                     role, is_verified, merit_credits, balance`,
//           [
//             token.name || profile?.name || "Unnamed",
//             token.email,
//             null,
//             token.picture || null,
//             null,
//             0,
//             false,
//             "user",
//             0,
//           ]
//         );

//         const user = result.rows[0];
//         token.id = user.user_id;
//         token.phone = user.phone;
//         token.merit_credits = user.merit_credits;
//         token.is_verified = user.is_verified;
//         token.profile_picture = user.profile_picture;
//         token.role = user.role;
//         token.bio = user.bio;
//         token.balance = user.balance;
//         token.name = user.name;
//         token.email = user.email;
//       } else {
//         const user = rows[0];
//         token.id = user.user_id;
//         token.phone = user.phone;
//         token.merit_credits = user.merit_credits;
//         token.is_verified = user.is_verified;
//         token.profile_picture = user.profile_picture;
//         token.role = user.role;
//         token.bio = user.bio;
//         token.balance = user.balance;
//         token.name = user.name;
//         token.email = user.email;
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.phone = token.phone;
//       session.user.merit_credits = token.merit_credits;
//       session.user.is_verified = token.is_verified;
//       session.user.profile_picture = token.profile_picture;
//       session.user.image = token.profile_picture || null;
//       session.user.bio = token.bio;
//       session.user.balance = token.balance;
//       session.user.role = token.role;
//       session.user.name = token.name;
//       session.user.email = token.email;
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
