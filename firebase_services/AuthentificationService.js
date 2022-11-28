import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { Alert } from "react-native";

export const createAccount = (email, password, confirmPassword, navigation) => {
  if(password === "" || confirmPassword === "" || email === "") {
    Alert.alert("Merci de remplir tous les champs")
  }
  if(password === confirmPassword) {
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        Alert.alert("Utilisateur créé");
        navigation.navigate("Login");
      }
    )
    .catch((error) => {
        if(error.code === "auth/weak-password") {
          Alert.alert("Le mot de passe doit faire au moins 6 caractères");
        } else if(error.code === "auth/email-already-in-use") {
          Alert.alert("Un utilisateur utilise déjà cette adresse e-mail")
        }
      } 
    )
  }
  else {
    Alert.alert("Les mots de passe ne correspondent pas");
  }
}

export const signIn = (email, password, navigation) => {
  if(password === "" || email === "") {
    Alert.alert("Merci de remplir tous les champs")
  }
  else {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      Alert.alert("Connecté");
      navigation.navigate("HomePage")
    })
    .catch((error) => {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email') {
          Alert.alert("Votre e-mail ou votre mot de passe est incorrect");
      } else {
          Alert.alert('Probleme dans votre requete');
      }
    })
  }
}

export const signUserOut = (navigation) => {
  signOut(auth).then(() => {
      navigation.navigate("Login")
    })
    .catch((error) => {
      Alert.alert("Une erreur s'est produite lors de la déconnexion")
    })
}


export const getEmail = () => {
  const [email, setEmail] = useState("");
  
  onAuthStateChanged(auth, (user) => {
    if(user) {
      setEmail(user.email);
    }
  })

  return email;
}