import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  useIonRouter,
  IonIcon,
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import { useState } from "react";
import  supabase  from "../utils/supabaseClient";

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // New: Loading state

  const doLogin = async () => {
    setLoading(true); // Show loading state

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login failed: " + error.message);
    } else {
      alert("Login successful!");
      navigation.push("/it35-lab/app", "forward", "replace");
    }

    setLoading(false); // Reset loading state
  };

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <div className="login-container">
          <h2>Welcome to Mobile Legends Beng Bang!</h2>
          <p>Please Sign in to continue</p>

          <IonItem className="input-field">
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              placeholder="Enter your email"
              value={email}
              onIonInput={(e) => setEmail(e.detail.value!)}
            />
          </IonItem>

          <IonItem className="input-field">
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value!)}
            />
            <IonButton
              fill="clear"
              slot="end"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              <IonIcon icon={showPassword ? eyeOff : eye} />
            </IonButton>
          </IonItem>

          <IonButton
            expand="full"
            className="login-btn"
            onClick={doLogin}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Logging in..." : "Login"}
          </IonButton>

          <p className="register-link">
          Does not have an account ?{" "}
            <span
              style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigation.push("/register", "forward")}
            >
              Sign up
            </span>
          </p>
        </div>
      </IonContent>

      <style>
        {`
          .login-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 20px;
          }

          .login-container h2 {
            font-size: 24px;
            margin-bottom: 10px;
          }

          .login-container p {
            color: gray;
            margin-bottom: 20px;
          }

          .input-field {
            width: 100%;
            max-width: 400px;
            margin-bottom: 15px;
            border-radius: 10px;
          }

          .password-toggle {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
          }

          .login-btn {
            width: 100%;
            max-width: 400px;
            border-radius: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          }

          .forgot-password {
            margin-top: 10px;
            font-size: 14px;
            text-align: center;
          }

          .register-link {
            margin-top: 10px;
            font-size: 14px;
          }
        `}
      </style>
    </IonPage>
  );
};

export default Login;