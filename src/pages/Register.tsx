import {
    IonButton,
    IonContent,
    IonInput,
    IonInputPasswordToggle,
    IonItem,
    IonList,
    IonPage,
    IonLabel,
    IonText,
    IonAlert,
    useIonRouter,
    IonGrid,
    IonRow,
    IonCol,
  } from "@ionic/react";
  import { useState } from "react";
  
  const Register: React.FC = () => {
    const navigation = useIonRouter();
  
    // State variables
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
    // Handle registration
    const handleRegister = () => {
      if (!username || !fullName || !email || !password || !confirmPassword) {
        setError("All fields are required.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
  
      setError("");
      setShowSuccessAlert(true);
    };
  
    const handleSuccessDismiss = () => {
      setShowSuccessAlert(false);
      navigation.push("/it35-lab", "root");
    };
  
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <IonGrid className="ion-text-center ion-justify-content-center ion-align-items-center" style={{ height: "100vh" }}>
            <IonRow className="ion-justify-content-center">
              <IonCol size-md="6" size-lg="4">
                <h2>Welcome to Mobile Legends !</h2>
                <p>Create an account to get started</p>
  
                <IonList>
                  <IonItem>
                    <IonLabel position="stacked">Username</IonLabel>
                    <IonInput type="text" placeholder="Enter your username" value={username} onIonInput={(e) => setUsername(e.detail.value!)} />
                  </IonItem>
  
                  <IonItem>
                    <IonLabel position="stacked">Full Name</IonLabel>
                    <IonInput type="text" placeholder="Enter your full name" value={fullName} onIonInput={(e) => setFullName(e.detail.value!)} />
                  </IonItem>
  
                  <IonItem>
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput type="email" placeholder="Enter your email" value={email} onIonInput={(e) => setEmail(e.detail.value!)} />
                  </IonItem>
  
                  <IonItem>
                    <IonLabel position="stacked">Password</IonLabel>
                    <IonInput type="password" placeholder="Enter your password" value={password} onIonInput={(e) => setPassword(e.detail.value!)}>
                      <IonInputPasswordToggle slot="end" />
                    </IonInput>
                  </IonItem>
  
                  <IonItem>
                    <IonLabel position="stacked">Confirm Password</IonLabel>
                    <IonInput type="password" placeholder="Confirm your password" value={confirmPassword} onIonInput={(e) => setConfirmPassword(e.detail.value!)}>
                      <IonInputPasswordToggle slot="end" />
                    </IonInput>
                  </IonItem>
                </IonList>
  
                {error && (
                  <IonText color="danger">
                    <p>{error}</p>
                  </IonText>
                )}
  
                <IonButton expand="full" fill="solid" onClick={handleRegister}>
                  Register
                </IonButton>
  
                <IonButton expand="full" fill="outline" onClick={() => navigation.push("/login", "back")}>
                  Back to Log In
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
  
          <IonAlert isOpen={showSuccessAlert} onDidDismiss={handleSuccessDismiss} header="Success" message="Registration Complete!" buttons={["OK"]} />
        </IonContent>
      </IonPage>
    );
  };
  
  export default Register;