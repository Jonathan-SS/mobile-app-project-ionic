import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  useIonLoading,
  IonBackButton,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { query, ref, orderByChild, equalTo, get } from "firebase/database";
import { database } from "../firebase-config";

import "./styles/CategoryPage.css";
import ProductItem from "../components/ProductItem";

export default function CategoryPage() {
  const [categoryResults, setCategoryResults] = useState([]);
  const [results, setResults] = useState(false);
  const [showLoader, dismissLoader] = useIonLoading();
  const categoryName = useParams().categoryName;

  useEffect(() => {
    async function categoryProducts() {
      showLoader();

      const categoryProducts = query(
        ref(database, "products"),
        orderByChild("category"),
        equalTo(categoryName)
      );

      try {
        let snapshot = await get(categoryProducts);

        if (snapshot.exists()) {
          let data = await snapshot.val();
          const matchingProducts = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          dismissLoader();

          setCategoryResults(matchingProducts);
          setResults(true);
        } else {
          console.log("no data found");
          setCategoryResults([]);
          setResults(false);
          dismissLoader();
        }
      } catch (error) {
        console.error(error);
      }
    }
    categoryProducts();
  }, [categoryName, dismissLoader, showLoader]);

  return (
    <IonPage>
      <IonHeader collapse="fade" translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton defaultHref="/" slot="start" />
          </IonButtons>
          <IonTitle size="medium" slot="end">
            Showing category: {categoryName}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="product-listSearch">
        {results ? (
          categoryResults.map((product) => (
            <ProductItem
              className="productItemSearch"
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <>
            <IonTitle>No products found.</IonTitle>
          </>
        )}
      </IonContent>
    </IonPage>
  );
}
