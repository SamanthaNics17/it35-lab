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
import supabase from "../utils/supabaseClient";

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const doLogin = async () => {
    setLoading(true);

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

    setLoading(false);
  };

  return (
    <IonPage>
  <IonHeader></IonHeader>
  <IonContent className="ion-padding" fullscreen>
    <div className="login-container">
      <h2 className="login-title">Welcome back Annarose!</h2>
      <p className="subtitle">Sign in with your credentials</p>

      <IonItem className="input-field">
        <IonLabel position="stacked">Email</IonLabel>
        <IonInput
          autofocus
          type="email"
          placeholder="Enter your email"
          value={email}
          onIonInput={(e) => setEmail(e.detail.value!)}
        />
      </IonItem>

      <IonItem className="input-field password-glow">
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
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </IonButton>

      <p className="register-link">
        Don’t have an account?{" "}
        <span
          className="sign-up"
          onClick={() => navigation.push("/register", "forward")}
        >
          Sign up
        </span>
      </p>
    </div>
  </IonContent>

  <style>
    {`
      /* Set the background image */
      .ion-page {
         background-image: url('/assets/background.jpg'); /* Updated path */
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        height: 100%;
      }

      .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 20px;
        animation: fadeSlideIn 0.6s ease-out;
        background: rgba(0, 0, 0, 0.5); /* Optional overlay for readability */
        border-radius: 10px;
      }

      .login-title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 10px;
        color: white;
      }

      .subtitle {
        color: #aaa;
        font-size: 0.95rem;
        margin-bottom: 20px;
        color: white;
      }

      .input-field {
        width: 100%;
        max-width: 400px;
        margin-bottom: 15px;
        border-radius: 10px;
        transition: box-shadow 0.3s ease;
      }

      .input-field:hover,
      .input-field:focus-within {
        box-shadow: 0 0 8px #4c8fff, 0 0 12px #4c8fff;
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
        background-color: #4c8fff;
        color: white;
        transition: background-color 0.2s ease, box-shadow 0.2s ease;
      }

      .login-btn:hover {
        background-color: #5c9eff;
        box-shadow: 0 0 8px #4c8fff;
      }

      .register-link {
        margin-top: 15px;
        font-size: 14px;
        color: #aaa;
      }

      .sign-up {
        color: #4c8fff;
        font-weight: 600;
        cursor: pointer;
        transition: color 0.2s ease;
      }

      .sign-up:hover {
        color: #6caeff;
        text-decoration: underline;
      }

      @keyframes fadeSlideIn {
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
</IonPage>

  );
};

export default Login;
