import "./styles/ProductCategoryItem.css";
import { IonImg, IonCard, IonCardContent, IonRouterLink } from "@ionic/react";

export default function CategoryItem({ item }) {
  return (
    <IonRouterLink
      routerDirection="forward"
      key={item.id}
      routerLink={`/category/${item.link}`}
      className="category-item "
    >
      <IonCard className="category-card">
        <IonImg className="category-image" src={item.image} />
        <IonCardContent className="category-content">
          {item.category}
        </IonCardContent>
      </IonCard>
    </IonRouterLink>
  );
}
