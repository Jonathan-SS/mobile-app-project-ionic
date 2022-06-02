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
  IonList,
} from "@ionic/react";
import { remove } from "firebase/database";
import { ellipsisHorizontalOutline } from "ionicons/icons";
import { Toast } from "@capacitor/toast";
import { getProdutcsRef } from "../firebase-config";
import "./styles/SingleProduct.css";
import ProductUpdateModal from "./Modals/UpdateProductModal";
import { useHistory } from "react-router";

export default function SingleProduct({ product, userInfo, currentUserId }) {
  const history = useHistory();
  const [presentActionSheet] = useIonActionSheet();
  const [presentDeleteDialog] = useIonAlert();
  const [presentUpdateModal, dismissUpdateModal] = useIonModal(
    <ProductUpdateModal product={product} dismiss={handleDismissUpdateModal} />
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
    history.go("/");

    await Toast.show({
      text: "New post created!",
      position: "center",
    });
  }

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
          {userInfo?.firstName ? userInfo?.firstName : ""}{" "}
          {userInfo?.lastName ? userInfo?.lastName : ""}
        </IonLabel>

        {product.productId === currentUserId ? (
          <IonButtons>
            <IonButton onClick={showActionSheet}>
              <IonIcon icon={ellipsisHorizontalOutline} />
            </IonButton>
          </IonButtons>
        ) : (
          <></>
        )}
      </IonItem>
      <IonList className="image-list">
        {product.images &&
          product.images.map((image) => (
            <IonImg
              key={image}
              className="ion-padding productImageEdit"
              src={image}
            />
          ))}
      </IonList>

      <IonCardContent>
        <IonCardTitle>
          {product?.title ? product.title : "Unknown product title"}
        </IonCardTitle>
        <IonCardSubtitle>{userInfo?.city}</IonCardSubtitle>
        <IonCardSubtitle>
          {product?.price
            ? "Price: " + product.price + " kr."
            : "Unknown price "}
        </IonCardSubtitle>
        <br />
        <IonCardSubtitle>Description</IonCardSubtitle>
        {product?.description
          ? product.description
          : "Unknown product description"}
        <br />
        <br />
        <IonCardSubtitle>Contact Seller</IonCardSubtitle>
        Telephone:{" "}
        <a href={`tel:+45${userInfo?.phone ? userInfo?.phone : ""}`}>
          {userInfo?.phone ? userInfo?.phone : ""}
        </a>
        {}
      </IonCardContent>
    </IonCard>
  );
}
