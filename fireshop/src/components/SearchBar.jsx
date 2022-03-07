import { IonSearchbar } from "@ionic/react";
import { useState } from "react";

export default function Searchbar() {
  const [searchText, setSearchText] = useState("");

  return (
    <IonSearchbar value={searchText} onIonChange="" slot="start"></IonSearchbar>
  );
}
