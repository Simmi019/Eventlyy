import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD81uCPtaKUrcWZj5MUscPkTXtMv_fNVxI",
  authDomain: "eventlyy-86295.firebaseapp.com",
  projectId: "eventlyy-86295",
  storageBucket: "eventlyy-86295.appspot.com", // Fixed the storage bucket URL
  messagingSenderId: "528165870097",
  appId: "1:528165870097:web:70020ff0127eb33e01afb0",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app); // This line is likely missing

export default app
