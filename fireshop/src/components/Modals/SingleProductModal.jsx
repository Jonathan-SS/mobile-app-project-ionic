import { IonModal, IonContent } from "remix";
import SingleProduct from "../SingleProduct";
export default function SingleProductModal() {
  return (
    <>
      <IonModal
        isOpen={true}
        swipeToClose={true}
        presentingElement={SingleProduct || undefined}
      >
        <IonContent>
          <SingleProduct />
        </IonContent>
      </IonModal>
    </>
  );
}
