import { IonImg, IonCard, IonCardContent, IonRouterLink } from "@ionic/react";
import "./styles/ProductListItem.css";

export default function ProductListItem({ product }) {
  return (
    <>
      <IonRouterLink
        routerDirection="forward"
        key={product.id}
        routerLink={`/product/${product.id}`}
        className="product-list-item-link "
      >
        <IonCard onClick={""} className="product-list-item">
          <IonImg
            height="200px"
            className="product-list-image"
            src={product.images[0]}
          />

          <IonCardContent className="item-list-content">
            <h2>{product.title}</h2>
            <h3>Pris: {product.price}</h3>
          </IonCardContent>
        </IonCard>
      </IonRouterLink>
    </>
  );
}
