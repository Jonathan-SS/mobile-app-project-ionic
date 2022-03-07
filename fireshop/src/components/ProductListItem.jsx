import { IonImg, IonCard, IonCardContent } from "@ionic/react";
import { useState, useEffect } from "react";
import "./ProductListItem.css"; /*
import { useHistory } from "react-router-dom";
import { Toast } from "@capacitor/toast";
import PostUpdateModal from "./PostUpdateModal";
import { remove } from "@firebase/database";
import { getPostRef, storage } from "../firebase-config";
import { ref, deleteObject } from "@firebase/storage";
import { getAuth } from "firebase/auth";*/

export default function ProductItem() {
  return (
    <>
      <IonCard className="product-item ">
        <div className="img-gradient">
          <IonImg
            className="product-image"
            src="https://em-epi-static.azureedge.net/altdk-cache/b/5/d/5/0/8/b5d5089c982ff744f5908a44a42d1f60364fe870.jpg"
          />
        </div>
        <IonCardContent className="item-content">Brugt bil</IonCardContent>
      </IonCard>
    </>
  );
}
