import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "../styles//Add-products.css";
import ProductForm from "../components/productForm";

export default function AddProduct() {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add product</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ProductForm />
      </IonContent>
    </IonPage>
  );
}
