import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
  useIonLoading,
  IonImg,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getUserRef } from "../firebase-config";
import { get, update } from "@firebase/database";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera } from "ionicons/icons";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../firebase-config";
import { Toast } from "@capacitor/toast";
import "./styles/UpdateProfile.css";
import { useHistory } from "react-router";

export default function UpdateProfile() {
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState({});
  const [showLoader, dismissLoader] = useIonLoading();
  const auth = getAuth();
  const history = useHistory();

  useEffect(() => {
    setUser(auth.currentUser);

    async function getUserDataFromDB() {
      const snapshot = await get(getUserRef(user.uid));
      const userData = snapshot.val();
      if (userData) {
        setUserInfo(userData);
        setImage(userData.image);
      }
    }

    if (user) getUserDataFromDB();
  }, [auth.currentUser, user]);

  async function handleSubmit(event) {
    event.preventDefault();
    showLoader();

    const userToUpdate = userInfo;

    if (imageFile.dataUrl) {
      const imageUrl = await uploadImage();
      userToUpdate.image = imageUrl;
    }

    await update(getUserRef(user.uid), userToUpdate);
    dismissLoader();
    await Toast.show({
      text: "User Profile saved!",
      position: "top",
    });

    history.go("/home");
  }

  async function takePicture() {
    const imageOptions = {
      quality: 80,
      width: 500,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    };
    const image = await Camera.getPhoto(imageOptions);
    setImageFile(image);
    setImage(image.dataUrl);
  }

  async function uploadImage() {
    const newImageRef = ref(storage, `${user.uid}.${imageFile.format}`);
    await uploadString(newImageRef, imageFile.dataUrl, "data_url");
    const url = await getDownloadURL(newImageRef);
    return url;
  }
  return (
    <>
      <IonContent>
        <form className="formUpdate" onSubmit={handleSubmit}>
          <div className="names">
            <IonItem className="firstName">
              <IonLabel position="stacked">Firstname</IonLabel>
              <IonInput
                value={userInfo.firstName}
                type="text"
                placeholder="Type your firstname"
                required
                onIonChange={(e) =>
                  setUserInfo({ ...userInfo, firstname: e.target.value })
                }
              />
            </IonItem>

            <IonItem className="lastName">
              <IonLabel position="stacked">Lastname</IonLabel>
              <IonInput
                value={userInfo.lastName}
                type="text"
                placeholder="Type your lastname"
                required
                onIonChange={(e) =>
                  setUserInfo({ ...userInfo, lastname: e.target.value })
                }
              />
            </IonItem>
          </div>

          <IonItem className="phone">
            <IonLabel position="stacked">Phone</IonLabel>
            <IonInput
              value={userInfo.phone}
              type="phone"
              placeholder="Type your phonenumber"
              required
              onIonChange={(e) =>
                setUserInfo({ ...userInfo, phone: e.target.value })
              }
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Adress</IonLabel>
            <IonInput
              value={userInfo.adress}
              type="text"
              placeholder="Type your adress"
              required
              onIonChange={(e) =>
                setUserInfo({ ...userInfo, adress: e.target.value })
              }
            />
          </IonItem>
          <div className="postal-city">
            <IonItem className="postal">
              <IonLabel position="stacked">Postal</IonLabel>
              <IonInput
                value={userInfo.postal}
                type="number"
                placeholder="Type your postal"
                required
                onIonChange={(e) =>
                  setUserInfo({ ...userInfo, postal: e.target.value })
                }
              />
            </IonItem>

            <IonItem className="city">
              <IonLabel position="stacked">City</IonLabel>
              <IonInput
                value={userInfo.city}
                type="text"
                placeholder="Type your city"
                required
                onIonChange={(e) =>
                  setUserInfo({ ...userInfo, city: e.target.value })
                }
              />
            </IonItem>
          </div>

          <IonItem onClick={takePicture} lines="none">
            <IonLabel>Choose Image</IonLabel>
            <IonButton>
              <IonIcon slot="icon-only" icon={camera} />
            </IonButton>
          </IonItem>
          {image && (
            <IonImg
              className="ion-padding profileImageEdit"
              src={image}
              onClick={takePicture}
            />
          )}

          <div className="ion-padding">
            <IonButton type="submit" expand="block">
              Save User
            </IonButton>
          </div>
        </form>
      </IonContent>
    </>
  );
}
