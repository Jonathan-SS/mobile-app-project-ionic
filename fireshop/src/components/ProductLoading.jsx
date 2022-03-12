import { IonCard, IonCardContent } from "@ionic/react";
import "./styles/ProductLoader.css";
export default function ProductLoading() {
  return (
    <>
      <IonCard className="product-item-loader ">
        <IonCard className="product-image-loader" />

        <IonCardContent className="item-content-loader">
          <div className="product-title-loader animated-background"></div>
          <div className="product-price-loader animated-background"></div>
        </IonCardContent>
      </IonCard>
      <IonCard className="product-item-loader ">
        <IonCard className="product-image-loader" />

        <IonCardContent className="item-content-loader">
          <div className="product-title-loader animated-background"></div>
          <div className="product-price-loader animated-background"></div>
        </IonCardContent>
      </IonCard>
      <IonCard className="product-item-loader ">
        <IonCard className="product-image-loader" />

        <IonCardContent className="item-content-loader">
          <div className="product-title-loader animated-background"></div>
          <div className="product-price-loader animated-background"></div>
        </IonCardContent>
      </IonCard>
    </>
  );
}
