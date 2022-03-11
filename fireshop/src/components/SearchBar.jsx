import {
  IonSearchbar,
  IonContent,
  IonTitle,
  useIonLoading,
} from "@ionic/react";
import { useState } from "react";
import { productsRef } from "../firebase-config.js";
import { get } from "firebase/database";
import ProductItem from "./ProductItem.jsx";
import "./styles/SearchBar.css";

export default function Searchbar() {
  const [searchResults, setSearchResults] = useState([]);
  const [showLoader, dismissLoader] = useIonLoading();

  async function search(e) {
    showLoader();
    let text = e.target.value.toLowerCase();

    try {
      let snapshot = await get(productsRef);

      if (snapshot.exists() && text !== "") {
        let data = await snapshot.val();
        const matchingProducts = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        let result = matchingProducts.filter((product) =>
          product.title.toLowerCase().includes(text)
        );
        dismissLoader();
        setSearchResults(result);
      } else if (snapshot.exists() && text === "") {
        let data = await snapshot.val();
        const matchingProducts = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        dismissLoader();
        setSearchResults(matchingProducts);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <IonSearchbar
        enterkeyhint="Search"
        onIonChange={search}
        slot="start"
      ></IonSearchbar>
      <IonContent className="product-listSearch">
        {searchResults ? (
          searchResults.map((product) => (
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
    </>
  );
}
