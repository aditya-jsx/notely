import dotenv from 'dotenv';


dotenv.config();

export const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
export const MONGO_URL = process.env.MONGO_URL;

export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const CLIENT_URL = process.env.CLIENT_URL;

if (!JWT_USER_PASSWORD) {
    console.error("FATAL ERROR: JWT_USER_PASSWORD is not defined in environment variables.");
    process.exit(1);
}

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    console.error("FATAL ERROR: Google OAuth credentials are not defined.");
    process.exit(1);
}