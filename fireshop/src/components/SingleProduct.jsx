import {
  IonCard,
  IonCardHeader,
  IonContent,
  IonCardTitle,
  IonCardSubtitle,
  IonImg,
} from "@ionic/react";

import placeholder from "../../public/assets/logo/ImagePNG";

import "./styles/SingleProduct.css";

export default function SingleProduct({ product }) {
  return (
    <>
      <IonContent>
        (
        <IonCard>
          <IonImg src={product?.image ? product.image : placeholder} />
          <IonCardHeader>
            <IonCardTitle>
              {product?.title ? product.title : "Unknown product title"}
            </IonCardTitle>
            <IonCardSubtitle>
              {product?.price ? product.price : "Unknown price Title"}
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
        );
      </IonContent>
    </>
  );
}
