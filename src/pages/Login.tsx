import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonIcon,
  useIonRouter,
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import { useState } from "react";
import supabase from "../utils/supabaseClient";

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const doLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("Login failed: " + error.message);
    } else {
      alert("Login successful!");
      navigation.push("/it35-lab/app", "forward", "replace");
    }

    setLoading(false);
  };

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="login-wrapper">
          <div className="login-card">
            <h2 className="login-title">Welcome back Annarose!</h2>
            <p className="login-subtitle">Sign in with your credentials</p>

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
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <IonIcon icon={showPassword ? eyeOff : eye} />
              </IonButton>
            </IonItem>

            <IonButton
              expand="full"
              className="login-btn"
              onClick={doLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </IonButton>

            <p className="register-text">
              Don’t have an account?{" "}
              <span
                className="register-link"
                onClick={() => navigation.push("/register", "forward")}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
        <style>
          {`
            .login-wrapper {
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              background: linear-gradient(to bottom right, #0d0d0d, #1a1a1a);
              padding: 16px;
            }

            .login-card {
              background-color: #111;
              padding: 32px 24px;
              border-radius: 16px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.4);
              width: 100%;
              max-width: 400px;
              animation: fadeIn 0.5s ease-out;
            }

            .login-title {
              font-size: 24px;
              font-weight: bold;
              text-align: center;
              color: white;
              margin-bottom: 8px;
            }

            .login-subtitle {
              font-size: 14px;
              color: #ccc;
              text-align: center;
              margin-bottom: 24px;
            }

            .input-field {
              margin-bottom: 18px;
              border-radius: 12px;
              background-color: #222;
              color: white;
            }

            .input-field ion-input {
              color: white;
            }

            .password-toggle {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 10px;
            }

            .login-btn {
              margin-top: 8px;
              border-radius: 12px;
              background-color: #4c8fff;
              font-weight: bold;
              transition: transform 0.2s ease, box-shadow 0.2s ease;
              box-shadow: 0 6px 15px rgba(76, 143, 255, 0.3);
            }

            .login-btn:hover {
              transform: translateY(-3px);
              box-shadow: 0 8px 20px rgba(76, 143, 255, 0.4);
            }

            .login-btn:active {
              transform: translateY(1px);
              box-shadow: 0 3px 6px rgba(76, 143, 255, 0.2);
            }

            .register-text {
              text-align: center;
              color: #aaa;
              margin-top: 16px;
              font-size: 14px;
            }

            .register-link {
              color: #4c8fff;
              font-weight: 600;
              cursor: pointer;
              transition: color 0.2s ease;
            }

            .register-link:hover {
              color: #6caeff;
              text-decoration: underline;
            }

            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
        </style>
      </IonContent>
    </IonPage>
  );
};

export default Login;
