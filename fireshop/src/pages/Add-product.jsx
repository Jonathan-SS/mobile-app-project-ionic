import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./styles//Add-products.css";
import ProductForm from "../components/productForm";
import { Geolocation } from "@capacitor/geolocation";
import { Toast } from "@capacitor/toast";
import { useHistory } from "react-router";
const geofire = require("geofire-common");

export default function AddProduct() {
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
    const hash = geofire.geohashForLocation([
      Number(latitude),
      Number(longitude),
    ]);
    //const koordinater = latitude + "," + longitude;
    const url = `http://api.positionstack.com/v1/reverse?access_key=a1a44587e2c53335bf837acc103a4613&query=${latitude},${longitude}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const city = data.data[0].administrative_area;
    return { city, hash };
  }

  async function handleSubmit(newPost) {
    Geolocation.requestPermissions();
    const location = await getLocation();
    newPost.location = location;
    const url =
      "https://ionic-marketplace-mobile-default-rtdb.firebaseio.com/products.json";
    newPost.dateAdded = new Date().getTime();
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newPost),
    });
    const data = await response.json();
    console.log(data);
    history.replace("/home");
    addedPost();
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Set a product for sale</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ProductForm handleSubmit={handleSubmit} />
      </IonContent>
    </IonPage>
  );
}
