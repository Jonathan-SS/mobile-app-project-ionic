import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./styles//Add-products.css";
import ProductForm from "../components/productForm";
import { Toast } from "@capacitor/toast";
import { useHistory } from "react-router";
import { getProdutcsRef } from "../firebase-config";
import { set } from "firebase/database";
import { useEffect, useState } from "react";

export default function AddProduct() {
  const [city, setCity] = useState("");
  const history = useHistory();

  const addedPost = async () => {
    await Toast.show({
      text: "Your product is now for sale",
    });
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(getLocation);
    } else {
      console.error("Geolocation API not supported");
    }
  }, []);

  async function getLocation(pos) {
    const longitude = String(pos.coords.longitude);
    const latitude = String(pos.coords.latitude);
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const response = await fetch(url);
    const data = await response.json();
    const city = data.locality.split(" ")[0];
    setCity(city);
  }

  async function handleSubmit(newPost) {
    newPost.city = city;
    newPost.dateAdded = new Date().getTime();
    const uId = Math.floor(Math.random() * Date.now());
    const ref = getProdutcsRef(uId);
    await set(ref, newPost);
    addedPost();
    history.push("/");
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" text="Back" />
            </IonButtons>
            <IonTitle size="medium">Set for sale</IonTitle>
          </IonToolbar>
        </IonHeader>

        <ProductForm
          buttonText="Set product for sale"
          handleSubmit={handleSubmit}
        />
      </IonContent>
    </IonPage>
  );
}
