import { IonModal, IonContent } from "remix";
import UpdateProfile from "./UpdateProfile";
export default function UpdateModal() {
  return (
    <>
      <IonModal
        isOpen={true}
        swipeToClose={true}
        presentingElement={UpdateProfile || undefined}
      >
        <IonContent>
          <UpdateProfile />
        </IonContent>
      </IonModal>
    </>
  );
}
