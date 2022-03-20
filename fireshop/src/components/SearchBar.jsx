import {
  IonSearchbar,
  IonContent,
  IonTitle,
  IonList,
  IonRouterLink,
} from "@ionic/react";
import { useState } from "react";
import { productsRef } from "../firebase-config.js";
import { onValue } from "firebase/database";
import ProductItem from "./ProductItem.jsx";
import "./styles/SearchBar.css";

export default function Searchbar({ dismiss }) {
  const [searchResults, setSearchResults] = useState([]);

  async function search(e) {
    setSearchResults([]);
    let text = e.target.value.toLowerCase();

    onValue(productsRef, (snapshot) => {
      let productsArr = [];
      snapshot.forEach((productSnapshot) => {
        const id = productSnapshot.key;
        const data = productSnapshot.val();
        data.id = id;
        if (data.title.toLowerCase().includes(text)) {
          productsArr.push(data);
        }
      });
      if (productsArr.length > 0) {
        setSearchResults(productsArr);
      }
    });
  }

  return (
    <>
      <IonSearchbar
        enterkeyhint="Search"
        onIonChange={search}
        slot="start"
      ></IonSearchbar>
      <IonContent
        scrollbar-x="false"
        scrollbar-y="false"
        className="product-list-search"
      >
        <IonList className="search-list">
          {searchResults.length >= 1 ? (
            searchResults.map((product) => (
              <IonRouterLink
                routerDirection="root"
                key={product.id}
                onClick={dismiss}
                routerLink={`/product/${product.id}`}
                className="product-item-search-link"
              >
                <ProductItem key={product.id} product={product} />
              </IonRouterLink>
            ))
          ) : (
            <IonTitle>No products found</IonTitle>
          )}
        </IonList>
      </IonContent>
    </>
  );
}
