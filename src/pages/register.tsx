import { 
  IonButton,
  IonContent, 
  IonHeader, 
  IonInput, 
  IonInputPasswordToggle, 
  IonItem, 
  IonList, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonLabel,
  IonText,
  IonAlert,
  useIonRouter
} from '@ionic/react';
import { useState } from 'react';
import  supabase  from "../utils/supabaseClient";


const Register: React.FC = () => {
  const navigation = useIonRouter(); // Ionic Router for navigation

  // State to manage form inputs
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for error messages
  const [error, setError] = useState('');

  // State for success alert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Function to handle registration with Supabase
  const handleRegister = async () => {
    if (!username || !firstName || !lastName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); // Clear previous errors

    // Supabase sign-up logic
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message); // Handle signup error
      return;
    }

    // Get the user ID from the Supabase authentication response
    const user = data.user;

    if (user) {
      // Insert user details into a separate "profiles" table
      const { error: profileError } = await supabase
        .from("profiles") // Ensure you have a "profiles" table in Supabase
        .insert([
          { id: user.id, username, first_name: firstName, last_name: lastName, email }
        ]);

      if (profileError) {
        setError("Registration successful, but profile creation failed. Contact support.");
        return;
      }

      setShowSuccessAlert(true); // Show success alert on successful registration
    }
  };

  // Function to handle success alert dismissal and redirect to login page
  const handleSuccessDismiss = () => {
    setShowSuccessAlert(false);
    navigation.push("/login", "forward"); // Redirect to login page
  };

  return (
    <IonPage>
      {/* Header Section */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Registration Form */}
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Username</IonLabel>
            <IonInput 
              type="text" 
              placeholder="Enter your username" 
              value={username} 
              onIonInput={(e) => setUsername(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">First Name</IonLabel>
            <IonInput 
              type="text" 
              placeholder="Enter your first name" 
              value={firstName} 
              onIonInput={(e) => setFirstName(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Last Name</IonLabel>
            <IonInput 
              type="text" 
              placeholder="Enter your last name" 
              value={lastName} 
              onIonInput={(e) => setLastName(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onIonInput={(e) => setEmail(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onIonInput={(e) => setPassword(e.detail.value!)}
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Confirm Password</IonLabel>
            <IonInput 
              type="password" 
              placeholder="Confirm your password" 
              value={confirmPassword} 
              onIonInput={(e) => setConfirmPassword(e.detail.value!)}
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>
          </IonItem>
        </IonList>

        {/* Error Message Display */}
        {error && <IonText color="danger"><p>{error}</p></IonText>}

        {/* Register and Login Buttons */}
        <IonButton expand="full" fill="solid" onClick={handleRegister}>
          Register
        </IonButton>

        {/* Back to Login Button */}
        <IonButton expand="full" fill="outline" color="medium" onClick={() => navigation.push("/login", "back")}>
          Already Have an Account? Back to Login
        </IonButton>

        {/* Success Alert */}
        <IonAlert
          isOpen={showSuccessAlert}
          onDidDismiss={handleSuccessDismiss}
          header="Success"
          message="Registration Complete! Please check your email to verify your account."
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;