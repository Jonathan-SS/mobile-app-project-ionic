import {
  IonButton,
  IonButtons,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import UpdateProfile from "../UpdateProfile";
export default function UpdateProfileModal({ showModal, pageEl, dismiss }) {
  return (
    <IonModal
      isOpen={showModal}
      cssClass="my-custom-class"
      presentingElement={pageEl}
      swipeToClose={true}
      onDidDismiss={dismiss}
    >
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Update Profile</IonTitle>
          <IonButtons slot="end">
            <IonButton onclick={dismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <UpdateProfile />
    </IonModal>
  );
}
