import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@utils/database';
import User from '@models/user';

// console.log({
//   clientId: process.env.GOOGLE_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// });
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    //get information about the current user to know the user that is currently online
    async session({ session }) {
      // console.log('session: ', session);
      const sessionUser = await User.findOne({
        email: session.user.email, //getting the current user email from session
      });

      session.user.id = sessionUser._id.toString(); //update the user id

      return session;
    },

    async signIn({ profile }) {
      // console.log('profile: ', profile);

      try {
        await connectToDB();

        //check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        //if not, create a new user and save it to db
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          });
        }
        return true; //once we have successfully signed-in return true
      } catch (error) {
        console.log(error);
        return false; //unsuccessfully signed in return false
      }
    },
  },
});

export { handler as GET, handler as POST };
