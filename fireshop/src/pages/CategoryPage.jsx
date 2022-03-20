import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  useIonLoading,
  IonBackButton,
  IonRouterLink,
  IonList,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { query, ref, orderByChild, equalTo, onValue } from "firebase/database";
import { database } from "../firebase-config";

import "./styles/CategoryPage.css";
import ProductItem from "../components/ProductItem";

export default function CategoryPage() {
  const [categoryResults, setCategoryResults] = useState([]);
  const [showLoader, dismissLoader] = useIonLoading();
  const categoryName = useParams().categoryName;

  useEffect(() => {
    function loadCategory() {
      const categoryProducts = query(
        ref(database, "products"),
        orderByChild("category"),
        equalTo(categoryName)
      );
      onValue(categoryProducts, (snapshot) => {
        const productsArr = [];
        snapshot.forEach((productSnapshot) => {
          const id = productSnapshot.key;
          const data = productSnapshot.val();
          data.id = id;

          productsArr.push(data);
        });

        setCategoryResults(productsArr);
      });
    }
    loadCategory();
  }, [showLoader, dismissLoader, categoryName]);

  return (
    <IonPage>
      <IonHeader collapse="fade" translucent>
        <IonToolbar mode="ios">
          <IonButtons>
            <IonBackButton defaultHref="/" slot="start" />
          </IonButtons>
          <IonTitle slot="start" size="medium">
            {categoryName}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="product-listSearch">
        <IonList
          scrollbar-x="false"
          scrollbar-y="false"
          className="category-list"
        >
          {categoryResults.length >= 1 ? (
            categoryResults.map((product) => (
              <IonRouterLink
                routerDirection="forward"
                key={product.id}
                routerLink={`/product/${product.id}`}
                className="productItemSearch"
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
