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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./styles/SignIn-SignUp.css";

export default function SignUpPage() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const auth = getAuth();

  function handleSubmit(event) {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, mail, password)
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
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          <IonImg
            className="welcome-image"
            src="../../assets/icon/android-chrome-256x256.png"
          />
          <h2 className="welcome-message">Signup below</h2>
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
              Sign up
            </IonButton>
          </div>
          <div className="ion-text-center">
            <h4 className="signup-message">Already have an account?</h4>
            <IonButton
              className="sign-button"
              size="medium"
              fill="clear"
              onClick={() => history.replace("/signin")}
            >
              Go back to sign in
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
}
