import React, { useState, useRef, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonAlert,
  IonHeader,
  IonBackButton,
  IonButtons,
  IonText,
  IonCol,
  IonGrid,
  IonRow,
  IonInputPasswordToggle,
  IonImg,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from "@ionic/react";
import supabase from "../utils/supabaseClient";
import { useHistory } from "react-router-dom";

const EditAccount: React.FC = () => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const history = useHistory();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSessionAndData = async () => {
      const { data: session, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session || !session.session) {
        setAlertMessage("You must be logged in to access this page.");
        setShowAlert(true);
        history.push("/it35-lab/login");
        return;
      }

      const { data: user, error: userError } = await supabase
        .from("users")
        .select("user_firstname, user_lastname, user_avatar_url, user_email, username")
        .eq("user_email", session.session.user.email)
        .single();

      if (userError || !user) {
        setAlertMessage("User data not found.");
        setShowAlert(true);
        return;
      }

      setFirstName(user.user_firstname || "");
      setLastName(user.user_lastname || "");
      setAvatarPreview(user.user_avatar_url);
      setEmail(user.user_email);
      setUsername(user.username || "");
    };

    fetchSessionAndData();
  }, [history]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    if (password !== confirmPassword) {
      setAlertMessage("Passwords don't match.");
      setShowAlert(true);
      return;
    }

    const { data: session, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session || !session.session) {
      setAlertMessage("Error fetching session or no session available.");
      setShowAlert(true);
      return;
    }

    const user = session.session.user;

    if (!user.email) {
      setAlertMessage("Error: User email is missing.");
      setShowAlert(true);
      return;
    }

    const { error: passwordError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (passwordError) {
      setAlertMessage("Incorrect current password.");
      setShowAlert(true);
      return;
    }

    let avatarUrl = avatarPreview;

    if (avatarFile) {
      const fileExt = avatarFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("user-avatars")
        .upload(filePath, avatarFile, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        setAlertMessage(`Avatar upload failed: ${uploadError.message}`);
        setShowAlert(true);
        return;
      }

      const { data } = supabase.storage
        .from("user-avatars")
        .getPublicUrl(filePath);
      avatarUrl = data.publicUrl;
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({
        user_firstname: firstName,
        user_lastname: lastName,
        user_avatar_url: avatarUrl,
        username: username,
      })
      .eq("user_email", user.email);

    if (updateError) {
      setAlertMessage(updateError.message);
      setShowAlert(true);
      return;
    }

    if (password) {
      const { error: passwordUpdateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (passwordUpdateError) {
        setAlertMessage(passwordUpdateError.message);
        setShowAlert(true);
        return;
      }
    }

    setAlertMessage("Account updated successfully!");
    setShowAlert(true);
    history.push("/it35-lab/app");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/it35-lab/app" />
        </IonButtons>
      </IonHeader>
      <IonContent
        style={{
          "--background": "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
          "--ion-item-background": "rgba(204, 35, 102, 0.7)",
          "--ion-toolbar-background": "rgba(220, 39, 67, 0.8)",
        }}
      >
        <IonCard style={{
          margin: '16px',
          borderRadius: '16px',
          background: 'rgba(255, 240, 240, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(100, 100, 100, 0.15)',
          border: '1px solid rgba(200, 200, 200, 0.2)'
        }}>
          <IonCardHeader>
            <IonCardTitle style={{
              color: 'black',
              fontWeight: '600',
              fontSize: '1.4rem'
            }}>Modify your Account</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            {/* Avatar Upload Section */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              {avatarPreview && (
                <IonAvatar
                  style={{
                    width: "120px",
                    height: "120px",
                    margin: "0 auto 10px",
                    border: '2px solid rgba(200, 200, 200, 0.5)'
                  }}
                >
                  <IonImg src={avatarPreview} style={{ objectFit: "cover" }} />
                </IonAvatar>
              )}

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleAvatarChange}
              />

              <IonButton
                onClick={() => fileInputRef.current?.click()}
                style={{
                  '--background': 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
                  '--background-hover': 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
                  '--background-activated': 'linear-gradient(135deg, #fad0c4 0%, #ff9a9e 100%)',
                  '--border-radius': '12px',
                  '--box-shadow': '0 2px 10px rgba(100, 100, 100, 0.1)',
                  '--color': 'white',
                  fontWeight: '600'
                }}
              >
                Upload Avatar
              </IonButton>
            </div>

            {/* User Information Section */}
            <IonInput
              label="Username"
              labelPlacement="floating"
              fill="outline"
              style={{
                '--background': 'rgba(255, 255, 255, 0.7)',
                '--border-radius': '12px',
                '--padding-start': '12px',
                '--color': 'black',
                marginBottom: '16px'
              }}
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
            />

            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonInput
                    label="First Name"
                    labelPlacement="floating"
                    fill="outline"
                    style={{
                      '--background': 'rgba(255, 255, 255, 0.7)',
                      '--border-radius': '12px',
                      '--padding-start': '12px',
                      '--color': 'black',
                      marginBottom: '16px'
                    }}
                    value={firstName}
                    onIonChange={(e) => setFirstName(e.detail.value!)}
                  />
                </IonCol>
                <IonCol>
                  <IonInput
                    label="Last Name"
                    labelPlacement="floating"
                    fill="outline"
                    style={{
                      '--background': 'rgba(255, 255, 255, 0.7)',
                      '--border-radius': '12px',
                      '--padding-start': '12px',
                      '--color': 'black',
                      marginBottom: '16px'
                    }}
                    value={lastName}
                    onIonChange={(e) => setLastName(e.detail.value!)}
                  />
                </IonCol>
              </IonRow>
            </IonGrid>

            {/* Password Change Section */}
            <IonText style={{ display: 'block', margin: '16px 0 8px', fontWeight: '600', color: 'black' }}>
              Change Password
            </IonText>

            <IonInput
              label="New Password"
              type="password"
              labelPlacement="floating"
              fill="outline"
              counter={true}
              maxlength={30}
              style={{
                '--background': 'rgba(255, 255, 255, 0.7)',
                '--border-radius': '12px',
                '--padding-start': '12px',
                '--color': 'black',
                marginBottom: '16px'
              }}
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            >
              <IonInputPasswordToggle slot="end" />
              <div slot="helper" style={{ color: password.length < 8 ? 'red' : 'green', fontSize: '12px' }}>
                {password.length < 8 ? 'Password should be at least 8 characters' : 'Good password'}
              </div>
            </IonInput>

            <IonInput
              label="Confirm Password"
              type="password"
              labelPlacement="floating"
              fill="outline"
              counter={true}
              maxlength={30}
              style={{
                '--background': 'rgba(255, 255, 255, 0.7)',
                '--border-radius': '12px',
                '--padding-start': '12px',
                '--color': 'black',
                marginBottom: '16px'
              }}
              value={confirmPassword}
              onIonChange={(e) => setConfirmPassword(e.detail.value!)}
            >
              <IonInputPasswordToggle slot="end" />
              <div slot="helper" style={{ color: confirmPassword !== password ? 'red' : 'green', fontSize: '12px' }}>
                {confirmPassword !== password ? 'Passwords do not match' : 'Passwords match'}
              </div>
            </IonInput>

            {/* Current Password Section */}
            <IonText style={{ display: 'block', margin: '16px 0 8px', fontWeight: '600', color: 'black' }}>
              Confirm Changes
            </IonText>

            <IonInput
              label="Current Password"
              type="password"
              labelPlacement="floating"
              fill="outline"
              counter={true}
              maxlength={30}
              style={{
                '--background': 'rgba(255, 255, 255, 0.7)',
                '--border-radius': '12px',
                '--padding-start': '12px',
                '--color': 'black',
                marginBottom: '24px'
              }}
              value={currentPassword}
              onIonChange={(e) => setCurrentPassword(e.detail.value!)}
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>

            <IonButton
              expand="block"
              onClick={handleUpdate}
              style={{
                '--background': 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
                '--background-hover': 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
                '--background-activated': 'linear-gradient(135deg, #fad0c4 0%, #ff9a9e 100%)',
                '--border-radius': '12px',
                '--box-shadow': '0 2px 10px rgba(100, 100, 100, 0.1)',
                '--color': 'white',
                fontWeight: '600',
                height: '48px'
              }}
            >
              Update Account
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message={alertMessage}
          buttons={["OK"]}
          style={{
            '--background': 'rgba(255, 240, 240, 0.95)',
            '--backdrop-filter': 'blur(10px)',
            '--box-shadow': '0 4px 20px rgba(100, 100, 100, 0.15)',
            '--border-radius': '16px',
            '--header-color': 'black',
            '--message-color': '#333'
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default EditAccount;