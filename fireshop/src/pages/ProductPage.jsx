import { IonContent, IonPage, useIonLoading, IonList } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { get } from "firebase/database";
import { getProdutcsRef, getUserRef } from "../firebase-config";
import { getAuth } from "firebase/auth";

import "./styles/CategoryPage.css";
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
    console.log(currentUser);
    async function getUserInfo(productUserId) {
      const snapshot = await get(getUserRef(productUserId));
      const userData = snapshot.val();
      console.log(userData);
      return userData;
    }

    async function categoryProducts() {
      showLoader();

      try {
        let snapshot = await get(getProdutcsRef(productId));

        if (snapshot.exists()) {
          let data = await snapshot.val();
          dismissLoader();
          console.log(data);
          setProduct(data);
          console.log(data.productId);
          const userData = await getUserInfo(data.productId);
          setUserInfo(userData);
        } else {
          dismissLoader();
        }
      } catch (error) {
        console.error(error);
        dismissLoader();
      }
      dismissLoader();
    }
    categoryProducts();
  }, [productId, dismissLoader, showLoader]);

  return (
    <>
      <IonPage>
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
