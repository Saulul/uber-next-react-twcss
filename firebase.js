
import { initializeApp } from "firebase/app"
import { GoogleAuthProvider } from 'firebase/auth'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCYKqn4Uh6vDL9NPsGLaqnQUYMfF9RHUKo",
    authDomain: "uber-react-next-twcss.firebaseapp.com",
    projectId: "uber-react-next-twcss",
    storageBucket: "uber-react-next-twcss.appspot.com",
    messagingSenderId: "964053381495",
    appId: "1:964053381495:web:8b22969f05f5a9d5463172"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const auth = getAuth();

export {app, provider, auth}