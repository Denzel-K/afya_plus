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

          if (isAdmin == true) {
            user = await Admin.findOne({ username: email });

            if (user && bcrypt.compare(password, user.password)) {
              return {
                id: user._id.toString(),
                username: user.username,
                role: 'admin'
              };
            } 
            else {
              throw new Error('Invalid admin credentials');
            }
          } 

          else {
            user = await Patient.findOne({ email });

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
              throw new Error('Invalid patient credentials');
            }
          }
          /*
          const user = await Patient.findOne({ email });

          if (user && bcrypt.compare(password, user.personal_details.password)) {
            return {
              id: user._id.toString(),
              email: user.personal_details.email,
              name: user.personal_details.name,
              gender: user.personal_details.gender,
              phone: user.personal_details.phone
            }
          }
          else {
            console.log("Invalid email or password");
            throw new Error('Invalid email or password');
          }
          */
        } 
        catch (error) {
          console.log("Error: ", error);
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
