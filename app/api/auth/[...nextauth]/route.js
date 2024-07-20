import NextAuth from 'next-auth';
import { connectToDB } from '../../../../utils/database';
import Patient from '../../../../models/patient';
import Admin from '../../../../models/admin';
import bcrypt from 'bcryptjs';
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',

      async authorize(credentials, req) {
        const {email, password, isAdmin} = credentials;

        try {
          await connectToDB();

          let user;

          if (isAdmin) {
            user = await Admin.findOne({ username: email });

            if (user && bcrypt.compare(password, user.password)) {
              return {
                id: user._id.toString(),
                username: user.username,
                role: 'admin'
              };
            } 
            else {
              return null;
            }
          } 

          else {
            user = await Patient.findOne({ 'personal_details.email': email });
            console.log(email, user);

            if (user && bcrypt.compare(password, user.personal_details.password)) {
              return {
                id: user._id.toString(),
                email: user.personal_details.email,
                name: user.personal_details.name,
                gender: user.personal_details.gender,
                phone: user.personal_details.phone,
                role: 'patient'
              };
            } 
            else {
              return null;
            }
          }
        }
        catch (error) {
          console.log("Error: ", error);
          return null;
        }  
      }
    })
  ],
  session: {
    jwt: true
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;

        if (user.role === 'admin'){
          token.username = user.username;
        }

        if (user.role === 'patient') {
          token.email = user.email;
          token.name = user.name;
          token.gender = user.gender;
          token.phone = user.phone;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
         session.user = {
          id: token.id,
          role: token.role,
        }
        if (token.role === 'admin') {
          session.user.username = token.username;
        }

        if (token.role === 'patient') {
          session.user.email = token.email;
          session.user.name = token.name;
          session.user.gender = token.gender;
          session.user.phone = token.phone;
        }
      }
      
      return session;
    }
  }
});

export { handler as GET, handler as POST };
