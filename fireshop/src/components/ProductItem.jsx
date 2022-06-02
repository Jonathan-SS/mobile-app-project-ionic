import { IonImg, IonCard, IonCardContent } from "@ionic/react";

import "./styles/ProductItem.css";

export default function ProductItem({ product }) {
  return (
    <>
      <IonCard className="product-item-search">
        <IonImg className="product-image-search" src={product.images[0]} />

        <IonCardContent className="item-content-search">
          <h2>{product.title}</h2>
          <h3>Pris: {product.price} kr.</h3>
        </IonCardContent>
      </IonCard>
    </>
  );
}
