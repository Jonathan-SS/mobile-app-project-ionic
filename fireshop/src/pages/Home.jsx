import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonBackButton,
  IonButtons,
  IonList,
  IonListHeader,
  IonModal,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import "../styles/Home.css";
import Searchbar from "../components/SearchBar";
import ProductItem from "../components/ProductListItem";
import CategoryItem from "../components/ProductCategoryItem";

import { useState } from "react";

export default function Home() {
  const [searchbarVis, setSearchbarVis] = useState(false);

  const categories = [
    {
      image: "../../assets/kategori-icons/bil.svg",
      category: "Biler",
      key: 1,
    },
    {
      image: "../../assets/kategori-icons/boeger.svg",
      category: "Bøger",
      key: 2,
    },
    {
      image: "../../assets/kategori-icons/cykler.svg",
      category: "Cykler",
      key: 3,
    },
    {
      image: "../../assets/kategori-icons/dyr.svg",
      category: "Dyr",
      key: 4,
    },
    {
      image: "../../assets/kategori-icons/elektronik.svg",
      category: "Elektronik",
      key: 5,
    },
    {
      image: "../../assets/kategori-icons/hus.svg",
      category: "Hus",
      key: 6,
    },
    {
      image: "../../assets/kategori-icons/sport.svg",
      category: "Sport",
      key: 7,
    },
    {
      image: "../../assets/kategori-icons/toej.svg",
      category: "Tøj",
      key: 8,
    },
  ];

  function searchbarShow() {
    if (!searchbarVis) {
      setSearchbarVis(true);
    } else {
      setSearchbarVis(false);
    }
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          {searchbarVis ? (
            <>
              <IonButtons>
                <IonBackButton
                  onClick={searchbarShow}
                  color="dark"
                  text="Back"
                  defaultHref="home"
                />
              </IonButtons>
              <Searchbar />
            </>
          ) : (
            <IonToolbar>
              <IonTitle size="large">Home</IonTitle>
              <IonButton onClick={searchbarShow} color="none" slot="end">
                <IonIcon
                  color="dark"
                  slot="icon-only"
                  size="large"
                  icon={searchOutline}
                />
              </IonButton>
            </IonToolbar>
          )}
        </IonHeader>

        <IonListHeader>Products near you</IonListHeader>
        <IonList className="product-list">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </IonList>
        <IonListHeader>Products near you</IonListHeader>
        <IonList className="categoryList">
          {categories.map((category) => (
            <CategoryItem key={category.key} item={category} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
