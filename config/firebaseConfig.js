
import { getStorage } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "insta-clone-735c7.firebaseapp.com",
    projectId: "insta-clone-735c7",
    storageBucket: "insta-clone-735c7.appspot.com",
    messagingSenderId: "231294023387",
    appId: "1:231294023387:web:933b2d9ae4e20877f97efe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);