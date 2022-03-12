import { IonContent, IonTitle, useIonLoading } from "@ionic/react";

import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { database } from "../firebase-config";
import { equalTo, get, orderByChild, query } from "firebase/database";
import { useParams } from "react-router";
import { ref } from "firebase/storage";

export default function CategoryView() {
  const [categoryResults, setCategoryResults] = useState([]);
  const [showLoader, dismissLoader] = useIonLoading();
  const { categoryName } = useParams();

  async function categoryProducts(test) {
    showLoader();

    const categoryProducts = query(
      ref(database, "products"),
      orderByChild("city"),
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
      } else {
        console.log("no data found");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(categoryProducts, [categoryProducts]);
  return (
    <IonContent className="product-listSearch">
      {categoryResults ? (
        categoryResults.map((product) => (
          <ProductItem
            className="productItemSearch"
            key={product.id}
            product={product}
          />
        ))
      ) : (
        <>
          <IonTitle>Search for products</IonTitle>
        </>
      )}
    </IonContent>
  );
}
