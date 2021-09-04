import firebase from 'firebase'

const firebaseConfig = "PASTE YOUR FIREBASE APP CONFIGS"

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }