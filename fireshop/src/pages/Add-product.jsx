import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonLoading,
} from "@ionic/react";
import "./styles//Add-products.css";
import ProductForm from "../components/productForm";
import { Geolocation } from "@capacitor/geolocation";
import { Toast } from "@capacitor/toast";
import { useHistory } from "react-router";
import { getProdutcsRef } from "../firebase-config";
import { set } from "firebase/database";

export default function AddProduct() {
  const [showLoader, dismissLoader] = useIonLoading();
  const history = useHistory();

  const addedPost = async () => {
    await Toast.show({
      text: "Your product is now for sale",
    });
  };

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

  async function handleSubmit(newPost) {
    showLoader();
    Geolocation.requestPermissions();
    const location = await getLocation();
    newPost.city = location;
    newPost.dateAdded = new Date().getTime();
    const uId = Math.floor(Math.random() * Date.now());
    const ref = getProdutcsRef(uId);
    set(ref, newPost);

    dismissLoader();
    history.replace("/home");
    addedPost();
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
