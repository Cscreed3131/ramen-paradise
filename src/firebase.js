import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import conf from './conf/conf'; 
import {getAuth} from 'firebase/auth'

const firebaseConfig = conf;

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);