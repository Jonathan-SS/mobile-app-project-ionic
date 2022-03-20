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
import { Geolocation } from "@capacitor/geolocation";
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
    Geolocation.requestPermissions();

    console.log("Det virker");

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

  const printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates.coords;
  };

  async function getLocation() {
    const coordsData = await printCurrentPosition();
    const longitude = String(coordsData.longitude);
    const latitude = String(coordsData.latitude);
    const url = `http://api.positionstack.com/v1/reverse?access_key=a1a44587e2c53335bf837acc103a4613&query=${latitude},${longitude}`;
    const response = await fetch(url);
    const data = await response.json();
    const city = data.data[0].administrative_area;
    setCity(city);
    return city;
  }

  async function getClosestToMe() {
    const city = await getLocation();
    await loadProducts(city);
  }

  useIonViewWillEnter(getClosestToMe, [productsCloseToMe, getClosestToMe]);

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
