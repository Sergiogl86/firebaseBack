import dotenv from "dotenv";

import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

dotenv.config();

const firebaseApp = initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();
const storage = getStorage(firebaseApp);

export { db, storage };
