const conf = {
    apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
    authDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
    projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
    storageBucket: '',
    messagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
    appId: String(import.meta.env.VITE_FIREBASE_APP_ID),
    measurementId: String(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID),
}

export default conf