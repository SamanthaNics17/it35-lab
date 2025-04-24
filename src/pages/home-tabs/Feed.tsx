import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonText 
} from '@ionic/react';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonText style={{ textAlign: 'center', padding: '20px' }}>
          {/* Avatar Image */}
          <img 
            src="https://variety.com/wp-content/uploads/2023/08/Screen-Shot-2023-08-10-at-3.43.28-PM.png?w=1000&h=667&crop=1&resize=1360%2C907" 
            alt="Avatar"
            style={{
              width: 'auto', 
              height: '150px', 
              borderRadius: '50%', 
              marginBottom: '20px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          />
          <h2>Hi 👋, I'm Samantha Nics</h2>
          <p>A student specializing in Cyber and Network Security and Software Development</p>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li>🔭 I’m currently working on Avengers <strong>Senior Sales Associate</strong></li>
            <li>🌱 I’m currently learning <strong>to fly high</strong></li>
            <li>💬 Ask me about the <strong>Avengers</strong></li>
            <li>📫 How to reach me: <strong>20211740@nbsc.edu.ph</strong></li>
          </ul>
          <h3>Languages and Tools:</h3>
          <p>
            <a href="https://getbootstrap.com" target="_blank" rel="noreferrer">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40" />
            </a>
            <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40" />
            </a>
            <a href="https://git-scm.com/" target="_blank" rel="noreferrer">
              <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40" />
            </a>
            <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40" />
            </a>
            <a href="https://www.adobe.com/in/products/illustrator.html" target="_blank" rel="noreferrer">
              <img src="https://www.vectorlogo.zone/logos/adobe_illustrator/adobe_illustrator-icon.svg" alt="illustrator" width="40" height="40" />
            </a>
            <a href="https://ionicframework.com" target="_blank" rel="noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Ionic_Logo.svg" alt="ionic" width="40" height="40" />
            </a>
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40" />
            </a>
            <a href="https://www.linux.org/" target="_blank" rel="noreferrer">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" alt="linux" width="40" height="40" />
            </a>
            <a href="https://www.mysql.com/" target="_blank" rel="noreferrer">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40" />
            </a>
            <a href="https://nodejs.org" target="_blank" rel="noreferrer">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40" />
            </a>
            <a href="https://www.photoshop.com/en" target="_blank" rel="noreferrer">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-line.svg" alt="photoshop" width="40" height="40" />
            </a>
            <a href="https://www.php.net" target="_blank" rel="noreferrer">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" alt="php" width="40" height="40" />
            </a>
            <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40" />
            </a>
            <a href="https://reactnative.dev/" target="_blank" rel="noreferrer">
              <img src="https://reactnative.dev/img/header_logo.svg" alt="reactnative" width="40" height="40" />
            </a>
            <a href="https://unity.com/" target="_blank" rel="noreferrer">
              <img src="https://www.vectorlogo.zone/logos/unity3d/unity3d-icon.svg" alt="unity" width="40" height="40" />
            </a>
            <a href="https://unrealengine.com/" target="_blank" rel="noreferrer">
              <img src="https://raw.githubusercontent.com/kenangundogan/fontisto/036b7eca71aab1bef8e6a0518f7329f13ed62f6b/icons/svg/brand/unreal-engine.svg" alt="unreal" width="40" height="40" />
            </a>
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default About;