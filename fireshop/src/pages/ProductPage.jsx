import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  useIonLoading,
  IonBackButton,
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { query, ref, orderByChild, equalTo, get } from "firebase/database";
import { database, getProdutcsRef } from "../firebase-config";

import "./styles/CategoryPage.css";
export default function ProductPage() {
  const [product, setProduct] = useState({});
  const [showLoader, dismissLoader] = useIonLoading();
  const productId = useParams().productId;

  useEffect(() => {
    async function categoryProducts() {
      showLoader();

      try {
        let snapshot = await get(getProdutcsRef(productId));

        if (snapshot.exists()) {
          let data = await snapshot.val();
          dismissLoader();
          console.log(data);
          setProduct(data);
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
        <IonList>
          <IonCard>
            <IonImg src={product?.image ? product.image : "placeholder"} />
            <IonCardHeader>
              <IonCardTitle>
                {product?.title ? product.title : "Unknown product title"}
              </IonCardTitle>
              <IonCardSubtitle>
                {product?.price
                  ? product.price + " kr."
                  : "Unknown price Title"}
              </IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
        </IonList>
      </IonPage>
    </>
  );
}
