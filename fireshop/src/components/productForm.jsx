import {
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonImg,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera } from "ionicons/icons";

export default function ProductForm({ product, handleSubmit }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setBody(product.body);
      setImage(product.image);
    }
  }, [product]);

  function submitEvent(event) {
    event.preventDefault();
    if (image !== "" && body !== "" && title !== "") {
      const formData = { title: title, body: body, image: image };
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
        <IonLabel position="stacked">Description</IonLabel>
        <IonTextarea
          value={body}
          placeholder="Tell us about your image"
          onIonChange={(e) => setBody(e.target.value)}
        ></IonTextarea>
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
