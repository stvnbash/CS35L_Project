import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
// import { FirestoreAdapter } from "@next-auth/firebase-adapter"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          // prompt: "consent",
          access_type: "offline",
          response_type: "code",
          hd: "g.ucla.edu"
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@g.ucla.edu")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  },
  // adapter: FirestoreAdapter({
  //   apiKey: process.env.FIREBASE_API_KEY,
  //   appId: process.env.FIREBASE_APP_ID,
  //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  //   databaseURL: process.env.FIREBASE_DATABASE_URL,
  //   projectId: process.env.FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  //   // Optional emulator config (see below for options)
  //   // emulator: {},
  // }),
  // ...
});