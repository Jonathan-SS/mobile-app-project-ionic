import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonButton,
  IonListHeader,
  IonList,
  IonRouterLink,
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
  onValue,
} from "firebase/database";

import ProductListItem from "../components/ProductListItem";
import ProductLoading from "../components/ProductLoading";
import UpdateProfileModal from "../components/Modals/UpdateProfileModal";

export default function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const pageEl = document.querySelector(".ion-page");
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [image, setImage] = useState("");
  const auth = getAuth();
  const [myProducts, setMyProducts] = useState();

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
      const myProducts = query(
        ref(database, "products"),
        orderByChild("productId"),
        equalTo(user.uid)
      );

      onValue(myProducts, (snapshot) => {
        const productsArr = [];
        snapshot.forEach((productSnapshot) => {
          const id = productSnapshot.key;
          const data = productSnapshot.val();
          data.id = id;
          productsArr.push(data);
        });
        if (productsArr.length > 0) {
          setMyProducts(productsArr);
        } else {
          const emptyProductsArr = [
            {
              id: 123456789,
              image: "../../assets/icon/apple-touch-icon.png",
              title: "Sell your products below",
              price: "0",
            },
          ];
          setMyProducts(emptyProductsArr);
        }
      });
    }
    myProducts();
  }, [auth.currentUser, user]);

  function handleSignOut() {
    signOut(auth);
  }

  return (
    <IonPage className="posts-page">
      <IonContent fullscreen>
        <UpdateProfileModal
          showModal={showModal}
          pageEl={pageEl}
          dismiss={() => setShowModal(false)}
        />

        <IonHeader>
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
        <div className="blob-wrapperprofile">
          <div className="pbContainer">
            {image && (
              <img alt="profileImage" className="profileImage" src={image} />
            )}
          </div>
          <div>
            <IonHeader className="welcomeText">Welcome {firstName}</IonHeader>
          </div>

          <IonListHeader className="products-header">
            Your Products
          </IonListHeader>
          <IonList className="product-list">
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
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
}
