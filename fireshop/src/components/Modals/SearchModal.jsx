import { IonModal, IonContent } from "remix";
import Searchbar from "../SearchBar";
export default function SearchModal() {
  return (
    <>
      <IonModal
        isOpen={true}
        swipeToClose={true}
        presentingElement={Searchbar || undefined}
      >
        <IonContent>
          <Searchbar />
        </IonContent>
      </IonModal>
    </>
  );
}
