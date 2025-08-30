// // import passport from "passport";
// // import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// // import { UserModel } from "../db";
// // import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config";

// // passport.use(new GoogleStrategy({
// //     clientID: GOOGLE_CLIENT_ID!,
// //     clientSecret: GOOGLE_CLIENT_SECRET!,
// //     callbackURL: "/api/v1/auth/google/callback", // Must match the route
// //     scope: ["profile", "email"]
// // },
// // async (accessToken, refreshToken, profile, done) => {
// //     try {
         
        
// //         const userEmail = (profile.emails && profile.emails.length > 0) 
// //             ? profile.emails[0].value 
// //             : "";

// //         const user = await UserModel.findOneAndUpdate(
// //             { googleId: profile.id },
// //             {
// //                 $setOnInsert: {
// //                     name: profile.displayName,
// //                     email: userEmail,
// //                     isVerified: true
// //                 }
// //             },
// //             {
// //                 upsert: true,
// //                 new: true
// //             }
// //         );

// //         return done(null, user);

// //     } catch (error) {
// //         return done(error, false);
// //     }
// // }));


// // import passport from "passport";
// // import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
// // import { UserModel } from "../db";
// // import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config";


// // const getEmailFromProfile = (profile: Profile): string => {
// //     if (profile.emails && profile.emails.length > 0) {
// //         // Find the verified email, or fall back to the first one
// //         const verifiedEmail = profile.emails.find(email => email.verified);
// //         return verifiedEmail ? verifiedEmail.value : (profile.emails[0]?.value ?? "");
// //     }
    
// //     return ""; 
// // };

// // passport.use(new GoogleStrategy({
// //     clientID: GOOGLE_CLIENT_ID!,
// //     clientSecret: GOOGLE_CLIENT_SECRET!,
// //     callbackURL: "/api/v1/auth/google/callback",
// // },
// // async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
// //     try {

// //         const userEmail = getEmailFromProfile(profile);

// //         if (!userEmail) {

// //             return done(new Error("No email found in Google profile."), false);
// //         }

// //         const user = await UserModel.findOneAndUpdate(
// //             { googleId: profile.id },
// //             {
            
// //                 $setOnInsert: {
// //                     name: profile.displayName,
// //                     email: userEmail,
// //                     isVerified: true
// //                 }
// //             },
// //             {
// //                 upsert: true,
// //                 new: true
// //             }
// //         );


// //         return done(null, user);

// //     } catch (error) {
// //         return done(error, false);
// //     }
// // }));



// import passport from "passport";
// import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
// import { UserModel } from "../db";
// import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config";

// const getEmailFromProfile = (profile: Profile): string => {
//     if (profile.emails && profile.emails.length > 0) {
//         const verifiedEmail = profile.emails.find(email => email.verified);
//         return verifiedEmail ? verifiedEmail.value : (profile.emails[0]?.value ?? "");
//     }
//     return ""; 
// };

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID!,
//     clientSecret: GOOGLE_CLIENT_SECRET!,
//     callbackURL: "http://localhost:3000/api/v1/auth/google/callback", // Use the full URL
// },
// async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
//     try {
//         const userEmail = getEmailFromProfile(profile);

//         if (!userEmail) {
//             return done(new Error("No email found in Google profile."), false);
//         }

//         let user = await UserModel.findOne({ email: userEmail });

//         if (user) {
//             // If user exists, update them with their Google ID
//             if (!user.googleId) {
//                 user.googleId = profile.id;
//                 user.isVerified = true;
//                 await user.save();
//             }
//         } else {
//             // If user does not exist, create a new one
//             user = await UserModel.create({
//                 googleId: profile.id,
//                 name: profile.displayName,
//                 email: userEmail,
//                 isVerified: true,
//             });
//         }

//         return done(null, user);

//     } catch (error) {
//         return done(error, false);
//     }
// }));