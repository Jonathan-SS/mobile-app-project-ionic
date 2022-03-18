import {
  IonSearchbar,
  IonContent,
  IonTitle,
  useIonLoading,
  IonList,
  IonRouterLink,
} from "@ionic/react";
import { useState } from "react";
import { productsRef } from "../firebase-config.js";
import { get, onValue } from "firebase/database";
import ProductItem from "./ProductItem.jsx";
import "./styles/SearchBar.css";

export default function Searchbar({ dismiss }) {
  const [searchResults, setSearchResults] = useState([]);

  async function search(e) {
    setSearchResults([]);
    let text = e.target.value.toLowerCase();

    console.log("Det virker");

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

      console.log(productsArr);
    });
  }

  return (
    <>
      <IonSearchbar
        enterkeyhint="Search"
        onIonChange={search}
        slot="start"
      ></IonSearchbar>
      <IonContent className="product-listSearch">
        <IonList className="search-list">
          {searchResults ? (
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
            <>
              <IonTitle>Search for products</IonTitle>
            </>
          )}
        </IonList>
      </IonContent>
    </>
  );
}
