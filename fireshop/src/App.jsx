import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { homeOutline, personOutline, pricetagOutline } from "ionicons/icons";
import Home from "./pages/Home";
import AddProduct from "./pages/Add-product";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./pages/styles/App.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useEffect, useState } from "react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import ProductsCloseToMePage from "./pages/ProductsCloseToMePage";
setupIonicReact();

function PrivateRoutes() {
  return (
    <>
      <IonFab vertical="bottom" horizontal="center" translucent="true">
        <IonFabButton routerLink="/add-product">
          <IonIcon size="large" icon={pricetagOutline}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home" component={Home} />
          <Route exact path="/add-product" component={AddProduct} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route path="/category/:categoryName" component={CategoryPage} />
          <Route path="/product/:productId" component={ProductPage} />
          <Route
            path="/location/:locationName"
            component={ProductsCloseToMePage}
          />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="Home" href="/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="AddProducts"></IonTabButton>
          <IonTabButton tab="ProfilePage" href="/profile">
            <IonIcon icon={personOutline} />
            <IonLabel>profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
}

function PublicRoutes() {
  return (
    <IonRouterOutlet>
      <Route exact path="/signin">
        <SignInPage />
      </Route>
      <Route exact path="/signup">
        <SignUpPage />
      </Route>
    </IonRouterOutlet>
  );
}

export default function HTMLIonRouterOutletElement() {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(
    localStorage.getItem("userIsAuthenticated")
  );
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
       
        // User is authenticated
        setUserIsAuthenticated(true);
        localStorage.setItem("userIsAuthenticated", true);
      } else {
        // User is signed out
        setUserIsAuthenticated(false);
        localStorage.removeItem("userIsAuthenticated", false);
      }
    });
  }, [auth]);

  return (
    <IonApp>
      <IonReactRouter>
        {userIsAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
        <Route>
          {userIsAuthenticated ? (
            <Redirect to="/home" />
          ) : (
            <Redirect to="/signin" />
          )}
        </Route>
      </IonReactRouter>
    </IonApp>
  );
}
