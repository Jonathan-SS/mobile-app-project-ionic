import {
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
} from "@ionic/react";
import { update } from "firebase/database";
import { getProdutcsRef } from "../../firebase-config";
import { Toast } from "@capacitor/toast";
import ProductForm from "../productForm";

export default function ProductUpdateModal({ product, dismiss }) {
  async function handleSubmit(productToUpdate) {
    await update(getProdutcsRef(product.id), productToUpdate);
    await Toast.show({
      text: "You updated your post",
      position: "top",
    });
  }

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton onClick={() => dismiss()}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Edit product</IonTitle>
        </IonToolbar>
      </IonHeader>
      <ProductForm
        buttonText="Update product"
        product={product}
        handleSubmit={handleSubmit}
      />
    </IonContent>
  );
}
