import "./styles/ProductCategoryItem.css";
import { IonImg, IonCard, IonCardContent } from "@ionic/react";

export default function CategoryItem({ item }) {
  return (
    <IonCard className="category-item ">
      <IonImg className="category-image" src={item.image} />
      <IonCardContent className="category-content">
        {item.category}
      </IonCardContent>
    </IonCard>
  );
}
