import {
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonImg,
  IonItem,
  IonAvatar,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonCardContent,
  useIonActionSheet,
  useIonModal,
  useIonAlert,
} from "@ionic/react";
import { remove } from "firebase/database";
import { ellipsisHorizontalOutline } from "ionicons/icons";
import ProductForm from "./productForm";
import { Toast } from "@capacitor/toast";
import { getProdutcsRef } from "../firebase-config";
import "./styles/SingleProduct.css";

export default function SingleProduct({ product, userInfo, currentUserId }) {
  const [presentActionSheet] = useIonActionSheet();
  const [presentDeleteDialog] = useIonAlert();
  const [presentUpdateModal, dismissUpdateModal] = useIonModal(
    <ProductForm post={product} dismiss={handleDismissUpdateModal} />
  );

  function showDeleteDialog() {
    presentDeleteDialog({
      header: "Delete Post",
      message: "Do you want to delete post?",
      buttons: [
        { text: "No" },
        { text: "Yes", role: "destructive", handler: deletePost },
      ],
    });
  }

  function showActionSheet(event) {
    event.preventDefault();
    presentActionSheet({
      buttons: [
        { text: "Edit", handler: presentUpdateModal },
        { text: "Delete", role: "destructive", handler: showDeleteDialog },
        { text: "Cancel", role: "cancel" },
      ],
    });
  }

  function handleDismissUpdateModal() {
    dismissUpdateModal();
  }

  async function deletePost() {
    await remove(getProdutcsRef(product.id));

    await Toast.show({
      text: "New post created!",
      position: "center",
    });
  }

  console.log(userInfo);

  return (
    <IonCard>
      <IonItem lines="none">
        <IonAvatar slot="start">
          <IonImg
            src={userInfo?.image ? userInfo.image : ""}
            alt={userInfo?.name}
          />
        </IonAvatar>
        <IonLabel>
          {userInfo?.firstName ? userInfo?.firstName : ""}
          {userInfo?.lastName ? userInfo?.lastName : ""}
        </IonLabel>
        <IonButtons>
          <IonButton onClick={showActionSheet}>
            <IonIcon icon={ellipsisHorizontalOutline} />
          </IonButton>
        </IonButtons>
        {/* {product.productId === currentUserId ? (
          <IonButtons>
            <IonButton onClick={presentActionSheet}>
              <IonIcon icon={ellipsisHorizontalOutline} />
            </IonButton>
          </IonButtons>
        ) : (
          <></>
        )} */}
      </IonItem>
      <IonImg src={product?.image ? product.image : "placeholder"} />

      <IonCardContent>
        <IonCardTitle>
          {product?.title ? product.title : "Unknown product title"}
        </IonCardTitle>
        <IonCardSubtitle>{userInfo?.city}</IonCardSubtitle>
        <IonCardSubtitle>
          {product?.price
            ? "Price: " + product.price + " kr."
            : "Unknown price Title"}
        </IonCardSubtitle>
        <IonCardSubtitle>Description</IonCardSubtitle>
        {product?.description ? product.description : "Unknown product title"}
      </IonCardContent>
    </IonCard>
  );
}
