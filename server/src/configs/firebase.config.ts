import admin from "firebase-admin";
import {env} from "../configs/env.configs"
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export default admin; 