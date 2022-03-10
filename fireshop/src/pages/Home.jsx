import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonButtons,
  IonList,
  IonListHeader,
  IonModal,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import "./styles/Home.css";
import Searchbar from "../components/SearchBar";
import ProductListItem from "../components/ProductListItem";
import CategoryItem from "../components/ProductCategoryItem";
import { Geolocation } from "@capacitor/geolocation";
import { useState } from "react";
import { productsRef } from "../firebase-config";
import { get } from "firebase/database";
const geofire = require("geofire-common");

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  /*
  async function closestTooMe() {
    Geolocation.requestPermissions();
    const coordinates = await Geolocation.getCurrentPosition().coords;
    const center = [coordinates.latitude, coordinates.longitude];

    const radiusInM = 5000;
    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises = [];
    let data = await get(productsRef).val;
    const keyedProducts = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    for (const b of bounds) {
      const q = keyedProducts.orderBy();
    }
  }
*/
  const pageEl = document.querySelector(".ion-page");

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

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonModal
          isOpen={showModal}
          cssClass="my-custom-class"
          presentingElement={pageEl}
          swipeToClose={true}
          onDidDismiss={() => setShowModal(false)}
        >
          <IonHeader translucent>
            <IonToolbar>
              <IonTitle>search products</IonTitle>
              <IonButtons slot="end">
                <IonButton onclick={() => setShowModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <Searchbar />
        </IonModal>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
            <IonButton
              onClick={() => setShowModal(true)}
              color="none"
              slot="end"
            >
              <IonIcon
                color="dark"
                slot="icon-only"
                size="large"
                icon={searchOutline}
              />
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonListHeader>Products near you</IonListHeader>
        <IonList className="product-list">
          <ProductListItem />
          <ProductListItem />
          <ProductListItem />
          <ProductListItem />
          <ProductListItem />
          <ProductListItem />
        </IonList>
        <IonListHeader>Categories</IonListHeader>
        <IonList className="categoryList">
          {categories.map((category) => (
            <CategoryItem key={category.key} item={category} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
