import React, { useState } from 'react';
import {
    IonButton,
    IonContent,
    IonInput,
    IonInputPasswordToggle,
    IonPage,
    IonTitle,
    IonModal,
    IonText,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonAlert,
    IonGrid,
    IonRow,
    IonCol
} from '@ionic/react';
import supabase from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
      cssClass="custom-alert"
      backdropDismiss={false}
      animated={true}
    />
  );
};

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleOpenVerificationModal = () => {
        if (!email.endsWith("@nbsc.edu.ph")) {
            setAlertMessage("Only @nbsc.edu.ph emails are allowed to register.");
            setShowAlert(true);
            return;
        }

        if (password !== confirmPassword) {
            setAlertMessage("Passwords do not match.");
            setShowAlert(true);
            return;
        }

        setShowVerificationModal(true);
    };

    const doRegister = async () => {
        setShowVerificationModal(false);
    
        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
    
            if (error) {
                throw new Error("Account creation failed: " + error.message);
            }
    
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
    
            const { error: insertError } = await supabase.from("users").insert([
                {
                    username,
                    user_email: email,
                    user_firstname: firstName,
                    user_lastname: lastName,
                    user_password: hashedPassword,
                },
            ]);
    
            if (insertError) {
                throw new Error("Failed to save user data: " + insertError.message);
            }
    
            setShowSuccessModal(true);
        } catch (err) {
            if (err instanceof Error) {
                setAlertMessage(err.message);
            } else {
                setAlertMessage("An unknown error occurred.");
            }
            setShowAlert(true);
        }
    };
    
    return (
        <IonPage className="register-page">
            <IonContent className='ion-padding' fullscreen>
                <div className="background-container">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>

                <IonGrid className="form-container">
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="10" sizeLg="8" sizeXl="6">
                            <div className="glass-card wide-form">
                                <h1 className="form-title">Sign up to continue
                              
                                </h1>
                                <h4>Create your Account</h4>

                                <div className="form-grid">
                                    <IonInput 
                                        className="custom-input"
                                        label="Username" 
                                        labelPlacement="stacked" 
                                        fill="outline" 
                                        type="text" 
                                        placeholder="Enter a unique username" 
                                        value={username} 
                                        onIonChange={e => setUsername(e.detail.value!)} 
                                    />
                                    
                                    <IonInput 
                                        className="custom-input"
                                        label="First Name" 
                                        labelPlacement="stacked" 
                                        fill="outline" 
                                        type="text" 
                                        placeholder="Enter your first name" 
                                        value={firstName} 
                                        onIonChange={e => setFirstName(e.detail.value!)} 
                                    />
                                    
                                    <IonInput 
                                        className="custom-input"
                                        label="Last Name" 
                                        labelPlacement="stacked" 
                                        fill="outline" 
                                        type="text" 
                                        placeholder="Enter your last name" 
                                        value={lastName} 
                                        onIonChange={e => setLastName(e.detail.value!)} 
                                    />
                                    
                                    <IonInput 
                                        className="custom-input"
                                        label="Email" 
                                        labelPlacement="stacked" 
                                        fill="outline" 
                                        type="email" 
                                        placeholder="@nbsc.edu.ph" 
                                        value={email} 
                                        onIonChange={e => setEmail(e.detail.value!)} 
                                    />
                                    
                                    <IonInput 
                                        className="custom-input"
                                        label="Password" 
                                        labelPlacement="stacked" 
                                        fill="outline" 
                                        type="password" 
                                        placeholder="Enter password" 
                                        value={password} 
                                        onIonChange={e => setPassword(e.detail.value!)} 
                                    >
                                        <IonInputPasswordToggle slot="end" />
                                    </IonInput>
                                    
                                    <IonInput 
                                        className="custom-input"
                                        label="Confirm Password" 
                                        labelPlacement="stacked" 
                                        fill="outline" 
                                        type="password" 
                                        placeholder="Confirm password" 
                                        value={confirmPassword} 
                                        onIonChange={e => setConfirmPassword(e.detail.value!)} 
                                    >
                                        <IonInputPasswordToggle slot="end" />
                                    </IonInput>
                                </div>

                                <IonButton 
                                    className="register-button"
                                    onClick={handleOpenVerificationModal} 
                                    expand="block" 
                                    shape="round"
                                >
                                    REGISTER
                                </IonButton>
                                
                                <IonButton 
                                    className="signin-button"
                                    routerLink="/it35-lab" 
                                    expand="block" 
                                    fill="clear" 
                                    shape="round"
                                >
                                    Already have an account? Sign in
                                </IonButton>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                {/* Verification Modal */}
                <IonModal 
                    isOpen={showVerificationModal} 
                    onDidDismiss={() => setShowVerificationModal(false)}
                    className="custom-modal"
                >
                    <IonContent className="ion-padding modal-content">
                        <div className="modal-glass wide-modal">
                            <IonCard className="verification-card">
                                <IonCardHeader>
                                    <IonCardTitle className="modal-title">User Registration Details</IonCardTitle>
                                    <hr className="divider" />
                                    <IonCardSubtitle className="detail-label">Username</IonCardSubtitle>
                                    <IonCardTitle className="detail-value">{username}</IonCardTitle>

                                    <IonCardSubtitle className="detail-label">Email</IonCardSubtitle>
                                    <IonCardTitle className="detail-value">{email}</IonCardTitle>

                                    <IonCardSubtitle className="detail-label">Name</IonCardSubtitle>
                                    <IonCardTitle className="detail-value">{firstName} {lastName}</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <div className="modal-buttons">
                                        <IonButton 
                                            fill="clear" 
                                            onClick={() => setShowVerificationModal(false)}
                                            className="modal-cancel-button"
                                        >
                                            Cancel
                                        </IonButton>
                                        <IonButton 
                                            color="primary" 
                                            onClick={doRegister}
                                            className="modal-confirm-button"
                                        >
                                            Confirm
                                        </IonButton>
                                    </div>
                                </IonCardContent>
                            </IonCard>
                        </div>
                    </IonContent>
                </IonModal>

                {/* Success Modal */}
                <IonModal 
                    isOpen={showSuccessModal} 
                    onDidDismiss={() => setShowSuccessModal(false)}
                    className="success-modal"
                >
                    <IonContent className="ion-padding">
                        <div className="success-glass wide-modal">
                            <div className="success-content">
                                <IonTitle className="success-title">Registration Successful 🎉</IonTitle>
                                <div className="confetti">
                                    {[...Array(50)].map((_, i) => (
                                        <div key={i} className="confetti-piece"></div>
                                    ))}
                                </div>
                                <IonText className="success-text">
                                    <p>Your account has been created successfully.</p>
                                    <p>Please check your email address.</p>
                                </IonText>
                                <IonButton 
                                    routerLink="/it35-lab" 
                                    routerDirection="back" 
                                    color="primary"
                                    className="success-button"
                                >
                                    Go to Login
                                </IonButton>
                            </div>
                        </div>
                    </IonContent>
                </IonModal>

                <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

                <style>{`
                    /* Main Page Styles */
                    .register-page {
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
                        animation: fadeIn 0.5s ease-out;
                    }
                    
                    .wide-form {
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    
                    .form-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr; /* Two columns */
                        gap: 20px;
                        margin-bottom: 20px;
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    .form-title {
                        color: white;
                        text-align: center;
                        margin-bottom: 25px;
                        font-weight: 600;
                        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        font-size: 2rem;
                        grid-column: 1 / -1;
                    }
                    
                    /* Input Styles */
                    .custom-input {
                        --background: rgba(255, 255, 255, 0.1);
                        --color: white;
                        --border-color: rgba(255, 255, 255, 0.3);
                        --border-radius: 12px;
                        --highlight-color-focused: rgba(255, 255, 255, 0.5);
                        --padding-start: 15px;
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
                    .register-button {
                        --background: linear-gradient(135deg, #6e8efb, #a777e3);
                        --background-hover: linear-gradient(135deg, #5d7de8, #9666d6);
                        --background-activated: linear-gradient(135deg, #5d7de8, #9666d6);
                        --border-radius: 12px;
                        --box-shadow: 0 4px 15px rgba(110, 142, 251, 0.4);
                        margin: 20px 0;
                        height: 50px;
                        font-weight: 600;
                        font-size: 1.1rem;
                        transition: all 0.3s ease;
                        transform-style: preserve-3d;
                    }
                    
                    .signin-button {
                        --color: white;
                        --background-hover: rgba(255, 255, 255, 0.1);
                        font-weight: 500;
                    }
                    
                    /* Modal Styles */
                    .custom-modal {
                        --backdrop-opacity: 0.7;
                        --background: transparent;
                    }
                    
                    .modal-content {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        --background: transparent;
                    }
                    
                    .modal-glass {
                        background: rgba(255, 255, 255, 0.15);
                        backdrop-filter: blur(20px);
                        -webkit-backdrop-filter: blur(20px);
                        border-radius: 20px;
                        border: 1px solid rgba(255, 255, 255, 0.18);
                        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                        padding: 20px;
                        width: 90%;
                        max-width: 700px;
                        animation: slideUp 0.4s ease-out;
                    }
                    
                    .wide-modal {
                        max-width: 700px;
                    }
                    
                    @keyframes slideUp {
                        from { opacity: 0; transform: translateY(50px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    /* Rest of your existing styles remain the same */
                `}</style>
            </IonContent>
        </IonPage>
    );
};

export default Register;