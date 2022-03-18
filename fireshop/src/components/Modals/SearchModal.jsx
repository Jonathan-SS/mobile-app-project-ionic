import {
  IonButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonModal,
} from "@ionic/react";

import Searchbar from "../SearchBar";
export default function SearchModal({ dismiss, showModal, pageEl }) {
  return (
    <IonModal
      isOpen={showModal}
      cssClass="my-custom-class"
      presentingElement={pageEl}
      swipeToClose={true}
      onDidDismiss={showModal}
    >
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>search products</IonTitle>
          <IonButtons slot="end">
            <IonButton onclick={dismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <Searchbar dismiss={dismiss} />
    </IonModal>
  );
}
