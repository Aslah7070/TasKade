
import dotenv from 'dotenv';
dotenv.config();

export const env = {
    get PORT() {
      return process.env.PORT
    },
    get MONGO_URI() {
      return process.env.MONGO_URI;
    },
    get JWT_ACCESS_SECRET() {
      return process.env.JWT_ACCESS_SECRET;
    },
    get JWT_REFRESH_SECRET() {
      return process.env.JWT_REFRESH_SECRET;
    },
    get REDIS_URL() {
      return process.env.REDIS_URL;
    },
    get SENDER_EMAIL() {
      return process.env.SENDER_EMAIL;
    },
    get PASSKEY() {
      return process.env.PASSKEY;
    },
    get CLIENT_ORIGIN() {
      return process.env.CLIENT_ORIGIN;
    },
    get RESET_PASS_URL() {
      return process.env.RESET_PASS_URL;
    },
    get EMAIL_USER() {
      return process.env.EMAIL_USER;
    },
    get EMAIL_PASSWORD() {
      return process.env.EMAIL_PASSWORD;
    },
    get FIREBASE_PROJECT_ID() {
      return process.env.FIREBASE_PROJECT_ID;
    },
    get FIREBASE_CLIENT_EMAIL() {
      return process.env.FIREBASE_CLIENT_EMAIL;
    },
    get FIREBASE_PRIVATE_KEY() {
      return process.env.FIREBASE_PRIVATE_KEY;
    }
  };

