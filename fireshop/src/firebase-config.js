// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeAuth, indexedDBLocalPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCElABcliRhP1Cw-KATwpCUAczyShWTHkM",
  authDomain: "ionic-marketplace-mobile.firebaseapp.com",
  databaseURL: "https://ionic-marketplace-mobile-default-rtdb.firebaseio.com",
  projectId: "ionic-marketplace-mobile",
  storageBucket: "ionic-marketplace-mobile.appspot.com",
  messagingSenderId: "85325615563",
  appId: "1:85325615563:web:3b4d275266089054e1264e",
  measurementId: "G-6SJK3ZXTY6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize auth
export const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence,
});

// Create database reference
export const database = getDatabase(app);
// Reference to posts in Realtime DB
export const productsRef = ref(database, "products");
// Reference to users in Realtime DB
export const usersRef = ref(database, "users");
// Get reference to specific post using post id
export function getProdutcsRef(productId) {
  return ref(database, "products/" + productId);
}
// Get reference to specific user using user id
export function getUserRef(userId) {
  return ref(database, "users/" + userId);
}
// Reference to the storage service
export const storage = getStorage(app);
