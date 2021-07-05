import firebase from 'firebase/app'
import 'firebase/auth'

const env = process.env

const firebaseConfig = {
  apiKey: env.REACT_APP_FIRBASE_API_KEY,
  authDomain: env.REACT_APP_FIRBASE_AUTH_DOMAIN,
  projectId: env.REACT_APP_FIRBASE_PROJECT_ID,
  storageBucket: env.REACT_APP_FIRBASE_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_FIRBASE_MESSAGING_SENDERID,
  appId: env.REACT_APP_FIRBASE_APP_ID,
  measurementId: env.REACT_APP_FIRBASE_MEASURMENT_ID,
}

const firebasApp = firebase.initializeApp(firebaseConfig)

export const auth = firebasApp.auth()

export const fbLogInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  auth.useDeviceLanguage()

  provider.setCustomParameters({
    login_hint: 'user@example.com',
  })

  try {
    await auth.signInWithRedirect(provider)
  } catch (error) {
    console.log(error)
    return false
  }

  return true
}

export const fbGetCurrentUser = () => auth.currentUser

export const fbAddAuthListner = callback => {
  const onChange = user => {
    if (user) {
      console.log('here3')
      callback(user)
    } else {
      callback(null) //no current user
    }
  }

  return auth.onAuthStateChanged(onChange)
}

export const fbLogOut = async () => {
  try {
    await auth.signOut()
  } catch (error) {
    console.log(error)
  }
}

export default firebasApp
