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
  useIonViewWillEnter,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import "./styles/Home.css";
import Searchbar from "../components/SearchBar";
import ProductListItem from "../components/ProductListItem";
import CategoryItem from "../components/ProductCategoryItem";
import { Geolocation } from "@capacitor/geolocation";
import { useState } from "react";
import { database } from "../firebase-config";
import {
  get,
  query,
  orderByChild,
  ref,
  equalTo,
  limitToFirst,
} from "firebase/database";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [productsCloseToMe, setProductsCloseToMe] = useState();

  async function loadProducts(city) {
    console.log("Det virker");
    const aarhus = query(
      ref(database, "products"),
      orderByChild("city"),
      equalTo(city),
      limitToFirst(10)
    );

    try {
      let snapshot = await get(aarhus);

      if (snapshot.exists()) {
        let data = await snapshot.val();
        const matchingProducts = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        matchingProducts.sort(
          (product1, product2) => product2.dateAdded - product1.dateAdded
        );
        console.log(matchingProducts);
        if (matchingProducts.length > 0) {
          setProductsCloseToMe(matchingProducts);
        }
      } else {
        console.log("no data");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates.coords;
  };

  async function getLocation() {
    const coordsData = await printCurrentPosition();
    const longitude = String(coordsData.longitude);
    const latitude = String(coordsData.latitude);
    //const koordinater = latitude + "," + longitude;
    const url = `http://api.positionstack.com/v1/reverse?access_key=a1a44587e2c53335bf837acc103a4613&query=${latitude},${longitude}`;
    const response = await fetch(url);
    const data = await response.json();
    const city = data.data[0].administrative_area;
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
        <IonHeader>
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
          {productsCloseToMe ? (
            productsCloseToMe.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))
          ) : (
            <></>
          )}
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
