import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonText,
  useIonRouter,
  IonInputPasswordToggle,
  IonAlert
} from "@ionic/react";
import { useState } from "react";
import supabase from "../utils/supabaseClient";

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const doLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage("Login failed: " + error.message);
      setShowAlert(true);
    } else {
      navigation.push("/it35-lab/app", "forward", "replace");
    }

    setLoading(false);
  };

  return (
    <IonPage className="login-page">
      <IonContent fullscreen className="ion-padding">
        <div className="background-container">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className="form-container">
          <div className="glass-card">
            <h1 className="form-title">Welcome back Annarose!</h1>
            <p className="form-subtitle">Sign in with your credentials</p>

            <IonInput 
              className="custom-input"
              label="Email" 
              labelPlacement="stacked" 
              fill="outline" 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onIonInput={(e) => setEmail(e.detail.value!)} 
            />

            <IonInput 
              className="custom-input"
              label="Password" 
              labelPlacement="stacked" 
              fill="outline" 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onIonInput={(e) => setPassword(e.detail.value!)} 
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>

            <IonButton
              className="login-button"
              expand="block"
              onClick={doLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </IonButton>

            <IonButton
              className="signup-button"
              routerLink="/register"
              expand="block"
              fill="clear"
              shape="round"
            >
              Don't have an account? Sign up
            </IonButton>
          </div>
        </div>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Notification"
          message={alertMessage}
          buttons={['OK']}
          cssClass="custom-alert"
        />

        <style>{`
          /* Main Page Styles */
          .login-page {
            --ion-background-color: transparent;
          }
          
          .background-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
            background: linear-gradient(135deg, #6e8efb, #a777e3);
          }
          
          .shape {
            position: absolute;
            border-radius: 50%;
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: float 15s infinite ease-in-out;
          }
          
          .shape-1 {
            width: 300px;
            height: 300px;
            top: -50px;
            left: -50px;
            animation-delay: 0s;
          }
          
          .shape-2 {
            width: 200px;
            height: 200px;
            bottom: -50px;
            right: -50px;
            animation-delay: 5s;
          }
          
          .shape-3 {
            width: 150px;
            height: 150px;
            top: 40%;
            right: 20%;
            animation-delay: 10s;
          }
          
          @keyframes float {
            0%, 100% {
              transform: translate(0, 0) rotate(0deg);
            }
            25% {
              transform: translate(50px, 50px) rotate(5deg);
            }
            50% {
              transform: translate(0, 100px) rotate(0deg);
            }
            75% {
              transform: translate(-50px, 50px) rotate(-5deg);
            }
          }
          
          /* Form Container */
          .form-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
          }
          
          .glass-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            padding: 30px;
            width: 100%;
            max-width: 400px;
            animation: fadeIn 0.5s ease-out;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .form-title {
            color: white;
            text-align: center;
            margin-bottom: 10px;
            font-weight: 600;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            font-size: 1.8rem;
          }
          
          .form-subtitle {
            color: rgba(255, 255, 255, 0.9);
            text-align: center;
            margin-bottom: 25px;
            font-size: 1rem;
          }
          
          /* Input Styles */
          .custom-input {
            --background: rgba(255, 255, 255, 0.1);
            --color: white;
            --border-color: rgba(255, 255, 255, 0.3);
            --border-radius: 12px;
            --highlight-color-focused: rgba(255, 255, 255, 0.5);
            --padding-start: 15px;
            margin-bottom: 20px;
            transition: all 0.3s ease;
          }
          
          .custom-input:hover {
            --background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
          }
          
          .custom-input::part(label) {
            color: white;
            font-weight: 500;
          }
          
          .custom-input::part(placeholder) {
            color: rgba(255, 255, 255, 0.7);
          }
          
          /* Button Styles */
          .login-button {
            --background: linear-gradient(135deg, #6e8efb, #a777e3);
            --background-hover: linear-gradient(135deg, #5d7de8, #9666d6);
            --background-activated: linear-gradient(135deg, #5d7de8, #9666d6);
            --border-radius: 12px;
            --box-shadow: 0 4px 15px rgba(110, 142, 251, 0.4);
            margin-top: 10px;
            margin-bottom: 15px;
            height: 50px;
            font-weight: 600;
            transition: all 0.3s ease;
            transform-style: preserve-3d;
          }
          
          .login-button:hover {
            --box-shadow: 0 6px 20px rgba(110, 142, 251, 0.6);
            transform: translateY(-3px) scale(1.02);
          }
          
          .login-button:active {
            transform: translateY(1px);
          }
          
          .signup-button {
            --color: white;
            --background-hover: rgba(255, 255, 255, 0.1);
            font-weight: 500;
          }
          
          /* Alert Styles */
          .custom-alert {
            --backdrop-opacity: 0.8;
            --background: rgba(40, 40, 80, 0.9);
            --border-radius: 15px;
            --box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            --header-color: white;
            --message-color: rgba(255, 255, 255, 0.8);
            animation: alertPop 0.3s ease-out;
          }
          
          @keyframes alertPop {
            0% { transform: scale(0.8); opacity: 0; }
            80% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
          }
          
          .custom-alert .alert-button-group {
            justify-content: center;
          }
          
          .custom-alert .alert-button {
            --background: linear-gradient(135deg, #6e8efb, #a777e3);
            --color: white;
            --border-radius: 12px;
            --box-shadow: 0 4px 15px rgba(110, 142, 251, 0.4);
            min-width: 100px;
          }
        `}</style>
      </IonContent>
    </IonPage>
  );
};

export default Login;