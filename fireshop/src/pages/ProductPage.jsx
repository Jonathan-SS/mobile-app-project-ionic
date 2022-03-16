import {
  IonContent,
  IonPage,
  useIonLoading,
  IonList,
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { get, onValue } from "firebase/database";
import { getProdutcsRef, getUserRef } from "../firebase-config";
import { getAuth } from "firebase/auth";

import "./styles/ProductPage.css";
import SingleProduct from "../components/SingleProduct";

export default function ProductPage() {
  const [product, setProduct] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [currentUser, setCurrentUser] = useState();
  const [showLoader, dismissLoader] = useIonLoading();
  const productId = useParams().productId;
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser.uid) {
      setCurrentUser(auth.currentUser.uid);
    }

    async function getUserData(productUserId) {
      const snapshot = await get(getUserRef(productUserId));
      const userData = snapshot.val();
      if (productUserId) {
        setUserInfo(userData);
      }
    }
    async function singleProduct() {
      showLoader();

      onValue(getProdutcsRef(productId), (snapshot) => {
        const data = snapshot.val();
        data.id = productId;

        setProduct(data);
        getUserData(data.productId);
        dismissLoader();
      });

      dismissLoader();
    }
    singleProduct();
    getUserData();
  }, [productId, dismissLoader, showLoader]);

  return (
    <>
      <IonPage>
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons>
              <IonBackButton text="Back" />
            </IonButtons>
            <IonTitle>Product</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonList>
            <SingleProduct
              product={product}
              userInfo={userInfo}
              currentUserId={currentUser}
            />
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
}
