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
} from "@ionic/react";

import "./styles/ProfilePage.css";

import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getUserRef } from "../firebase-config";
import { onSnapshot } from "firebase/firestore";
import { get } from "@firebase/database";
import UpdateProfile from "../components/UpdateProfile";

export default function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const pageEl = document.querySelector(".ion-page");
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const auth = getAuth();

  useEffect(() => {
    setUser(auth.currentUser);

    async function getUserDataFromDB() {
      const snapshot = await get(getUserRef(user.uid));
      const userData = snapshot.val();
      if (userData) {
        setName(userData.name);
        setImage(userData.image);
      }
    }

    if (user) getUserDataFromDB();
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
          <IonHeader className="welcomeText">Welcome {name}</IonHeader>
        </div>

        <IonListHeader>Your Products</IonListHeader>
        <IonList className="product-list"></IonList>
      </IonContent>
    </IonPage>
  );
}
