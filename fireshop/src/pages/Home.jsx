import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonList,
  IonListHeader,
  useIonViewWillEnter,
  IonLabel,
  IonRouterLink,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import "./styles/Home.css";
import ProductListItem from "../components/ProductListItem";
import CategoryItem from "../components/ProductCategoryItem";

import { useState } from "react";
import { database } from "../firebase-config";
import ProductLoading from "../components/ProductLoading";

import {
  query,
  orderByChild,
  ref,
  equalTo,
  limitToFirst,
  onValue,
} from "firebase/database";
import SearchModal from "../components/Modals/SearchModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [productsCloseToMe, setProductsCloseToMe] = useState();
  const [city, setCity] = useState();

  async function loadProducts(city) {
    const cityProducts = query(
      ref(database, "products"),
      orderByChild("city"),
      equalTo(city),
      limitToFirst(10)
    );
    onValue(cityProducts, (snapshot) => {
      const productsArr = [];
      snapshot.forEach((productSnapshot) => {
        const id = productSnapshot.key;
        const data = productSnapshot.val();
        data.id = id;
        productsArr.push(data);
      });
      if (productsArr.length > 0) {
        setProductsCloseToMe(productsArr);
      }
    });
  }

  async function getLocation(pos) {
    const longitude = String(pos.coords.longitude);
    const latitude = String(pos.coords.latitude);

    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=da`;
    const response = await fetch(url);
    const data = await response.json();
    const city = data.locality.split(" ")[0];
    setCity(city);
    await loadProducts(city);
  }

  async function getClosestToMe() {
    if ("geolocation" in navigator) {
      console.log("geolocation is available");
      navigator.geolocation.getCurrentPosition(getLocation);
    } else {
      console.error("Geolocation API not supported");
    }
  }

  useIonViewWillEnter(getClosestToMe);

  const pageEl = document.querySelector(".ion-page");

  const categories = [
    {
      image: "../../assets/kategori-icons/bil.svg",
      category: "Cars",
      key: 1,
      link: "cars",
    },
    {
      image: "../../assets/kategori-icons/boeger.svg",
      category: "Books",
      key: 2,
      link: "books",
    },
    {
      image: "../../assets/kategori-icons/cykler.svg",
      category: "Bikes",
      key: 3,
      link: "bikes",
    },
    {
      image: "../../assets/kategori-icons/dyr.svg",
      category: "Pets",
      key: 4,
      link: "animals",
    },
    {
      image: "../../assets/kategori-icons/elektronik.svg",
      category: "Tech",
      key: 5,
      link: "electronics",
    },
    {
      image: "../../assets/kategori-icons/hus.svg",
      category: "House",
      key: 6,
      link: "house",
    },
    {
      image: "../../assets/kategori-icons/sport.svg",
      category: "Sport",
      key: 7,
      link: "sport",
    },
    {
      image: "../../assets/kategori-icons/toej.svg",
      category: "Clothes",
      key: 8,
      link: "clothes",
    },
  ];

  return (
    <IonPage>
      <IonContent fullscreen>
        <SearchModal
          dismiss={() => setShowModal(false)}
          showModal={showModal}
          pageEl={pageEl}
        />

        <IonHeader collapse="fade" translucent>
          <IonToolbar mode="ios">
            <IonTitle color="primary" size="large">
              Fireshop
            </IonTitle>
            <IonButton
              onClick={() => setShowModal(true)}
              color="none"
              slot="end"
              box-shadow="false"
              collapse
              mode="ios"
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

        <IonListHeader>
          <IonLabel>Products near you</IonLabel>
        </IonListHeader>
        {city ? (
          <IonRouterLink
            className="ion-padding "
            routerLink={`/location/${city}`}
          >
            Show more
          </IonRouterLink>
        ) : (
          <></>
        )}

        <IonList className="product-list">
          {productsCloseToMe ? (
            productsCloseToMe.map((product) => (
              <ProductListItem
                key={product.id}
                product={product}
                pageEl={pageEl}
              />
            ))
          ) : (
            <ProductLoading />
          )}
        </IonList>

        <IonListHeader>
          <IonLabel>Categories</IonLabel>
        </IonListHeader>

        <IonList className="category-list">
          {categories.map((category) => (
            <CategoryItem key={category.key} item={category} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
