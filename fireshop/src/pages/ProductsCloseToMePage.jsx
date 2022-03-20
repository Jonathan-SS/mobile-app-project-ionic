import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonRouterLink,
  IonList,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { query, ref, orderByChild, equalTo, onValue } from "firebase/database";
import { database } from "../firebase-config";

import "./styles/ProductsCloseToMePage.css";
import ProductItem from "../components/ProductItem";

export default function ProductsCloseToMePage() {
  const [locationResults, setLocationResults] = useState([]);
  const locationName = useParams().locationName;

  useEffect(() => {
    const locationProducts = query(
      ref(database, "products"),
      orderByChild("city"),
      equalTo(locationName)
    );
    onValue(locationProducts, (snapshot) => {
      const productsArr = [];
      snapshot.forEach((productSnapshot) => {
        const id = productSnapshot.key;
        const data = productSnapshot.val();
        data.id = id;

        productsArr.push(data);
      });

      setLocationResults(productsArr);
    });
  }, [locationName]);

  return (
    <IonPage>
      <IonHeader collapse="fade" translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton defaultHref="/" slot="start" />
          </IonButtons>
          <IonTitle size="medium" slot="start">
            {locationName}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="product-listSearch-location">
        <IonList
          scrollbar-x="false"
          scrollbar-y="false"
          className="category-list"
        >
          {locationResults.length >= 1 ? (
            locationResults.map((product) => (
              <IonRouterLink
                routerDirection="forward"
                key={product.id}
                routerLink={`/product/${product.id}`}
                className="productItemSearch-location"
              >
                <ProductItem key={product.id} product={product} />
              </IonRouterLink>
            ))
          ) : (
            <IonTitle>No products found.</IonTitle>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
