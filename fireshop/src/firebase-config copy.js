import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeAuth, indexedDBLocalPersistence } from "firebase/auth";

//Firebase configuration
const firebaseConfig = {
  apiKey: "api-key",
  authDomain: "domain",
  databaseURL: "url",
  projectId: "projectId",
  storageBucket: "storagebucket",
  messagingSenderId: "id",
  appId: "AppId",
  measurementId: "mId",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
