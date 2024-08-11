import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,

} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useState, useEffect } from "react";

export const firebaseConfig = {
  apiKey: "AIzaSyA90T1zNlTE2klpwKX1AsOwKZxaK-xSrsM",
  authDomain: "asfaleia-vehicule.firebaseapp.com",
  projectId: "asfaleia-vehicule",
  storageBucket: "asfaleia-vehicule.appspot.com",
  messagingSenderId: "903810675177",
  appId: "1:903810675177:web:cfbd4367920363812a5b78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
 const storage = getStorage(app);
export {
  setDoc,
  getDoc,
  updateDoc,
  getDownloadURL,
  onAuthStateChanged,
  addDoc,
  getDocs,
  deleteDoc,
  storage,
};

//Inscription
export const signupUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

//connexion
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

//deconnexion
export const logoutUser = () => {
  return signOut(auth);
};

//utilisateur courant
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      listener();
    };
  }, [currentUser]);

  return currentUser;
};

//Pour l'importation de la photo de profil


//l'utilisateur
export const user = (uid) => {
  return doc(db, `Users/${uid}`);
};

//following
export const following = (uid, idFollowed) => {
  return doc(db, "Users", uid, "abonnements", idFollowed);
};
//followers
export const follower = (uid, idFollow) => {
  return doc(db, "Users", uid, "abonnes", idFollow);
};

//verify following
export const verifyFollowing = (idFollowing, uid) => {
  return query(
    collection(db, "Users", idFollowing, "abonnes"),
    where("iduser", "==", uid)
  );
};

// get following
export const getFollowing = (uid) => {
  return collection(db, "Users", uid, "abonnements");
};
// get follower
export const getFollower = (uid) => {
  return collection(db, "Users", uid, "abonnes");
};
//delete following
export const deleteFollowing = (uid, id) => {
  return doc(db, "Users", uid, "abonnements", id);
};

//delete follower
export const deleteFollower = (idFollower, uid) => {
  return doc(db, "Users", idFollower, "abonnes", uid);
};

//recupération des beams
export const getBeam = (idUser) => {
  return query(
    collection(db, "beam"),
    where("userid", "==", idUser),
    where("etat", "==", "post"),
    orderBy("createdAt", "desc")
  );
};

//recupération des reBeams
export const getReBeam = (idUser) => {
  return query(
    collection(db, "beam"),
    where("userid", "==", idUser),
    where("etat", "==", "reepost"),
    orderBy("createdAt", "desc")
  );
};
//delete beams
export const deleteBeam = (idBeam) => {
  return doc(db, "beam", idBeam);
};
//delete ReBeams
export const deleteReBeam = (idReBeam) => {
  return doc(db, "beam", idReBeam);
};

//recupération des commentaires des beams
export const getComment = (idBeam) => {
  return query(
    collection(db, "beam", idBeam, "comments"),
    where("screamId", "==", idBeam),
    orderBy("createdAt", "desc")
  );
};

//récupération des commentaires des reBeams
export const getReComment = (idBeam) => {
  return query(
    collection(db, "beam", idBeam, "comments"),
    where("screamId", "==", idBeam),

    orderBy("createdAt", "desc")
  );
};

//récupérations des personnes bloquées
export const getBloque = (uid) => {
  return collection(db, "Users", uid, "bloquer");
};


export function Recap  (number) {
  const auth = getAuth();
  const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
  recaptchaVerifier.render();
  return signInWithPhoneNumber(auth , number ,recaptchaVerifier);
};
