import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonModal,
  IonListHeader,
  IonList,
  useIonViewWillEnter,
  IonRouterLink,
  useIonLoading,
} from "@ionic/react";

import "./styles/ProfilePage.css";

import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { database } from "../firebase-config";
import { getUserRef } from "../firebase-config";
import {
  get,
  query,
  orderByChild,
  ref,
  equalTo,
  limitToFirst,
} from "firebase/database";

import UpdateProfile from "../components/UpdateProfile";
import ProductListItem from "../components/ProductListItem";
import ProductLoading from "../components/ProductLoading";

export default function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const pageEl = document.querySelector(".ion-page");
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [image, setImage] = useState("");
  const auth = getAuth();
  const [ProductResults, setProductResults] = useState([]);
  const [myProducts, setMyProducts] = useState();
  const [results, setResults] = useState(false);

  useEffect(() => {
    setUser(auth.currentUser);

    async function getUserDataFromDB() {
      const snapshot = await get(getUserRef(user.uid));
      const userData = snapshot.val();
      if (userData) {
        setFirstName(userData.firstName);
        setImage(userData.image);
      }
    }

    if (user) getUserDataFromDB();

    async function myProducts() {
      console.log(user.uid);
      const myProducts = query(
        ref(database, "products"),
        orderByChild("productId"),
        equalTo(user.uid)
      );

      try {
        let snapshot = await get(myProducts);

        if (snapshot.exists()) {
          let data = await snapshot.val();
          const matchingProducts = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          setMyProducts(matchingProducts);
          setResults(true);
        } else {
          console.log("no data found");
          setProductResults([]);
          setResults(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    myProducts();
  }, [auth.currentUser, user]);

  function handleSignOut() {
    signOut(auth);
  }

  return (
    <IonPage className="posts-page">
      <IonContent fullscreen>
        <IonModal
          isOpen={showModal}
          cssClass="my-custom-class"
          presentingElement={pageEl}
          swipeToClose={true}
          onDidDismiss={() => setShowModal(false)}
        >
          <IonHeader translucent>
            <IonToolbar>
              <IonTitle>Update Profile</IonTitle>
              <IonButtons slot="end">
                <IonButton onclick={() => setShowModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <UpdateProfile />
        </IonModal>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={handleSignOut}>Sign Out</IonButton>
            </IonButtons>
            <IonButtons slot="primary">
              <IonButton
                onClick={() => setShowModal(true)}
                color="none"
                slot="primary"
              >
                Update Profile
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="pbContainer">
          {image && (
            <img alt="profileImage" className="profileImage" src={image} />
          )}
        </div>
        <div>
          <IonHeader className="welcomeText">Welcome {firstName}</IonHeader>
        </div>

        <IonListHeader className="products-header">Your Products</IonListHeader>
        <IonList className="product-list"></IonList>
        {myProducts ? (
          myProducts.map((product) => (
            <IonRouterLink
              routerDirection="forward"
              key={product.id}
              routerLink={`/product/${product.id}`}
            >
              <ProductListItem
                key={product.id}
                product={product}
                pageEl={pageEl}
              />
            </IonRouterLink>
          ))
        ) : (
          <ProductLoading />
        )}
      </IonContent>
    </IonPage>
  );
}
