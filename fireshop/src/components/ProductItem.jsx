import { IonImg, IonCard, IonCardContent } from "@ionic/react";

import "./styles/ProductItem.css"; /*
import { useHistory } from "react-router-dom";
import { Toast } from "@capacitor/toast";
import PostUpdateModal from "./PostUpdateModal";
import { remove } from "@firebase/database";
import { getPostRef, storage } from "../firebase-config";
import { ref, deleteObject } from "@firebase/storage";
import { getAuth } from "firebase/auth";*/

export default function ProductItem({ product }) {
  return (
    <>
      <IonCard className="product-item-search">
        <IonImg className="product-image-search" src={product.image} />

        <IonCardContent className="item-content-search">
          <h2>{product.title}</h2>
          <h3>Pris: {product.price} kr.</h3>
        </IonCardContent>
      </IonCard>
    </>
  );
}
