# UCLA ClubHub
- CS 35L Project
- Winter 2023
- Talha Abadin, Steven Bash, Curtis Chou, Lucas Kelley, & Warren Kim
- live website hosted on Vercel and available at https://clubhub.bruin.la at time of project completion

# Installation & Setup
1. To install the application and dependencies, run the following commands in your terminal:
```
$ git clone https://github.com/stvnbash/CS35L_Project
$ cd CS35L_Project
$ npm install
```
2. Create a file named `.env.local` in the root directory of this project.  Add the following environment variables and corresponding values from Firebase.  To be secure, these are intentionally ommitted from this Readme and not committed to the git repository.
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
```
3. To run the application locally, run this command:
```
$ npm run dev
```
4. Then, open your browser and type `localhost:3000` to visit a locally hosted version of this application.  Note that the site will not run as expected without haiving the proper environment variables for a Firebase Firestore database with two collections: `users` and `clubs`.
