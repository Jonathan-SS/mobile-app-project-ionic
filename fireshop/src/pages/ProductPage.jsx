import {
  IonContent,
  IonPage,
  useIonLoading,
  IonList,
  IonBackButton,
  IonCardHeader,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonLabel,
  IonTitle,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { get, onValue } from "firebase/database";
import { getProdutcsRef, getUserRef } from "../firebase-config";
import { getAuth } from "firebase/auth";

import "./styles/ProductPage.css";
import SingleProduct from "../components/SingleProduct";
import { backspaceOutline } from "ionicons/icons";

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
    console.log(currentUser);
    async function getUserInfo(productUserId) {
      const snapshot = await get(getUserRef(productUserId));
      const userData = snapshot.val();
      console.log(userData);
      return userData;
    }

    async function singleProduct() {
      showLoader();

      try {
        onValue(getProdutcsRef(productId), (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          data.id = productId;
          setProduct(data);
          dismissLoader();
        });
        if (product.ptoductId) {
          const userData = await getUserInfo(product.productId);
          setUserInfo(userData);
        }
      } catch (error) {
        console.error(error);
        dismissLoader();
      }
      dismissLoader();
    }
    singleProduct();
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
