import {
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonImg,
  IonButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera } from "ionicons/icons";
import { Geolocation } from "@capacitor/geolocation";

export default function ProductForm({ product, handleSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    Geolocation.requestPermissions();
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setCategory(product.category);
      setImage(product.image);
      setPrice(product.price);
    }
  }, [product]);

  function submitEvent(event) {
    event.preventDefault();
    if (
      image !== "" &&
      description !== "" &&
      title !== "" &&
      category !== "" &&
      price !== ""
    ) {
      const formData = { title, description, image, category, price };
      handleSubmit(formData);
    } else {
      alert("Du mangler noget info");
    }
  }

  async function takePicture() {
    const imageOptions = {
      quality: 80,
      width: 500,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    };
    const image = await Camera.getPhoto(imageOptions);
    const imageUrl = image.dataUrl;
    setImage(imageUrl);
  }
  return (
    <form onSubmit={submitEvent}>
      {image && (
        <IonImg className="ion-padding" src={image} onClick={takePicture} />
      )}
      <IonItem>
        <IonLabel position="stacked">Title</IonLabel>
        <IonInput
          value={title}
          placeholder="Type the title of your image"
          onIonChange={(e) => setTitle(e.target.value)}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Price</IonLabel>
        <IonInput
          value={price}
          placeholder="Set the price of your image"
          onIonChange={(e) => setPrice(e.target.value)}
        />
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">Description</IonLabel>
        <IonTextarea
          value={description}
          placeholder="Tell us about your image"
          onIonChange={(e) => setDescription(e.target.value)}
        ></IonTextarea>
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Category</IonLabel>
        <IonSelect
          value={category}
          placeholder="Choose category"
          okText="Okay"
          cancelText="Dismiss"
          interface="popover"
          onIonChange={(e) => setCategory(e.detail.value)}
        >
          <IonSelectOption value="cars">Cars</IonSelectOption>
          <IonSelectOption value="books">Books</IonSelectOption>
          <IonSelectOption value="bikes">Bikes</IonSelectOption>
          <IonSelectOption value="animals">Animals</IonSelectOption>
          <IonSelectOption value="electronics">Electronics</IonSelectOption>
          <IonSelectOption value="house">House</IonSelectOption>
          <IonSelectOption value="sport">Sport</IonSelectOption>
          <IonSelectOption value="clothes">Clothes</IonSelectOption>
        </IonSelect>
      </IonItem>

      <IonItem onClick={takePicture} lines="none">
        <IonLabel>Choose Image</IonLabel>
        <IonButton>
          <IonIcon slot="icon-only" icon={camera} />
        </IonButton>
      </IonItem>

      <div className="ion-padding">
        <IonButton type="submit" expand="block">
          Set for sale
        </IonButton>
      </div>
    </form>
  );
}
