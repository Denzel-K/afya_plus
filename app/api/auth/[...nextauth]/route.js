import NextAuth from 'next-auth';
//import Providers from 'next-auth/providers';
import { connectToDB } from '../../../../utils/database';
import Patient from '../../../../models/patient';
import bcrypt from 'bcryptjs';
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',

      async authorize(credentials) {
        const {email, password} = credentials;

        try {
          await connectToDB();

          const user = await Patient.findOne({ email });

          if(user){
            console.log("Patient found");
          }
          else{
            console.log("Patient not found");
          }

          if (user && bcrypt.compare(password, user.personal_details.password)) {
            return {
              id: user._id.toString(),
              email: user.personal_details.email,
              name: user.personal_details.name,
              gender: user.personal_details.gender,
              phone: user.personal_details.phone
            }

            //return user;
          }
          else {
            console.log("Invalid email or password");
            throw new Error('Invalid email or password');
          }
        } 
        catch (error) {
          console.log("Error: ", error);
        }  
      }
    })
  ],
  session: {
    jwt: true
    // strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.gender = user.gender;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          gender: token.gender,
          phone: token.phone
        };
      }
      
      return session;
    }
  }
});

export { handler as GET, handler as POST };
