import { IonImg, IonCard, IonCardContent } from "@ionic/react";
import "./styles/ProductListItem.css";
// import { Toast } from "@capacitor/toast";
// import PostUpdateModal from "./PostUpdateModal";
// import { remove } from "@firebase/database";
// import { getPostRef, storage } from "../firebase-config";
// import { ref, deleteObject } from "@firebase/storage";
// import { getAuth } from "firebase/auth";

export default function ProductListItem({ product }) {
  return (
    <>
      <IonCard onClick={""} className="product-list-item ">
        <div className="img-gradient">
          <IonImg
            height="200px"
            className="product-list-image"
            src={product.image}
          />
        </div>
        <IonCardContent className="item-list-content">
          <h2>{product.title}</h2>
          <h3>Pris: {product.price}</h3>
        </IonCardContent>
      </IonCard>
    </>
  );
}
