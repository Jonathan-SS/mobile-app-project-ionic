import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonImg,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./styles/SignIn-SignUp.css";

export default function SignInPage() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const auth = getAuth();

  function handleSubmit(event) {
    event.preventDefault();
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <IonPage className="posts-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          <IonImg
            className="welcome-image"
            src="../../assets/icon/android-chrome-256x256.png"
          />
          <h2 className="welcome-message">Welcome to FireShop</h2>
          <h4 className="signin-message">Please sign in below</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="stacked">Mail</IonLabel>
            <IonInput
              value={mail}
              type="email"
              placeholder="Type your mail"
              onIonChange={(e) => setMail(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              value={password}
              type="password"
              placeholder="Type your password"
              onIonChange={(e) => setPassword(e.target.value)}
            />
          </IonItem>
          <div className="ion-padding">
            <IonButton type="submit" expand="block">
              Sign in
            </IonButton>
          </div>
          <div className="ion-text-center">
            <h4 className="signup-message">Don't have an account?</h4>
            <IonButton
              className="sign-button"
              size="medium"
              fill="clear"
              onClick={() => history.replace("/signup")}
            >
              Sign Up
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
}
