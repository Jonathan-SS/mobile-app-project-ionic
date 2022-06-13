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
  IonList,
  useIonLoading,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { Camera } from "@capacitor/camera";
import { camera } from "ionicons/icons";
import { getAuth } from "firebase/auth";
import { Toast } from "@capacitor/toast";
import { ref, getDownloadURL, uploadBytes } from "@firebase/storage";
import { storage } from "../firebase-config";

import "./styles/ProductForm.css";

export default function ProductForm({ product, handleSubmit, buttonText }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [productId, setProductId] = useState("");
  const [user, setUser] = useState({});
  const [showLoader, dismissLoader] = useIonLoading();

  const auth = getAuth();

  useEffect(() => {
    setUser(auth.currentUser);
    if (user) {
      setProductId(user.uid);
    }

    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setCategory(product.category);
      setImages(product.images);
      setPrice(product.price);
      setProductId(product.productIds);
    }
  }, [auth.currentUser, user, product]);

  async function submitEvent(event) {
    event.preventDefault();

    if (
      productId !== "" &&
      imageFiles !== "" &&
      description !== "" &&
      title !== "" &&
      category !== "" &&
      price !== ""
    ) {
      showLoader();
      const formData = {
        productId,
        title,
        description,
        category,
        price,
      };

      if (imageFiles.length > 0) {
        let productImages = [];
        for (let i = 0; i < imageFiles.length; i++) {
          const file = imageFiles[i];
          const newImageRef = ref(
            storage,
            `${formData.title}-${user.uid}-${i}.${file.format}`
          );
          const imageBlob = await fetch(file.webPath).then((r) => r.blob());
          await uploadBytes(newImageRef, imageBlob, {
            contentType: file.format,
          });
          const downloadUrl = await getDownloadURL(newImageRef);
          productImages.push(downloadUrl);
        }
        formData.images = productImages;
      }

      handleSubmit(formData);
      dismissLoader();
    } else {
      await Toast.show({
        text: "You are missing some informaiton about your product",
        position: "center",
      });
    }
  }
  async function choosePictures() {
    const imageOptions = {
      quality: 50,
      width: 500,
      limit: 5,
    };
    const imagesFiles = await Camera.pickImages(imageOptions);
    const allImages = [];
    imagesFiles.photos.forEach((image) => {
      allImages.push(image.webPath);
    });
    setImageFiles(imagesFiles.photos);
    setImages(allImages);
  }

  return (
    <form onSubmit={submitEvent}>
      <IonList className="image-list">
        {images &&
          images.map((image) => (
            <IonImg
              key={image}
              className="ion-padding productImageEdit"
              src={image}
            />
          ))}
      </IonList>

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
          placeholder="Tell us about your product"
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
      <IonItem lines="none">
        <IonLabel>Choose Images</IonLabel>
        <IonButton onClick={choosePictures}>
          <IonIcon slot="icon-only" icon={camera} />
        </IonButton>
      </IonItem>
      <div className="ion-padding">
        <IonButton type="submit" expand="block">
          {buttonText}
        </IonButton>
      </div>
    </form>
  );
}
