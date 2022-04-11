import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";

import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  getDocs,
  orderByKey,
} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, onValue, set } from "firebase/database";

// Local Import
import { auth, db, myfirestore } from "./firebaseconfig";
import { HomeScreen } from "./screens/homescreen1";
import { LoginScreen } from "./screens/loginscreen2";
import { RegisterScreen } from "./screens/registerscreen3";
import { Navigator } from "./components/navigator";

const dataArr = [];

export const Homepage = () => {
  const clickFn = () => {
    // * Realtime database functions
    // writeUserData();
    // getAllRealtimeDbData();
    // * Firestore databse functions
    // writeFirestoreData();
    // readFirestoreData();
    // updateFirestoreData();
    // deleteFirestoreData();
    // getAllFirestoreData();
  };

  const [status, setStatus] = useState("");
  const [newAccountStatus, setNewAccountStatus] = useState("");

  //    Data from Firestore Database
  const writeFirestoreData = async () => {
    // similar for update
    const myDoc = doc(myfirestore, "Pokemon", "Random");
    const docData = { value: "Saviper" };
    setDoc(myDoc, docData)
      .then(console.log("Success"))
      .catch((error) => {
        console.log(error);
      });
  };

  const readFirestoreData = () => {
    const myDoc = doc(myfirestore, "Pokemon", "Random");
    getDoc(myDoc).then((snapshot) => {
      if (snapshot.exists) {
        console.log(snapshot.data());
      } else {
        console.log("error in reading data");
      }
    });
  };

  const updateFirestoreData = () => {
    const myDoc = doc(myfirestore, "Pokemon", "Random");
    const newValue = { value: "Charmander" };
    const mergeValue = false;
    setDoc(myDoc, newValue, { merge: mergeValue })
      .then(console.log("Updated"))
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFirestoreData = () => {
    const myDoc = doc(myfirestore, "Pokemon", "Random");

    deleteDoc(myDoc)
      .then(console.log("Deleted"))
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllFirestoreData = async () => {
    const coll = collection(myfirestore, "Pokemon");
    const querySnapshot = await getDocs(coll);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log("ID:" + doc.id + " " + "Name: " + doc.data().Name);
      dataArr.push({ id: doc.id, name: doc.data().Name });
    });
  };

  // -------------------------------------------------------------------------------------------
  //   DATA FROM REALTIME DATABASE
  const writeRealtimeDbData = () => {
    const val = Math.random().toString(36).substring(2, 12);
    const timestamp = new Date();
    set(ref(db, "users/" + val), {
      username: val,
      email: val,
      day: timestamp.toDateString(),
      time: timestamp.toTimeString(),
      saveTimestamp: timestamp.getTime(),
      profile_picture: "checking",
    });
  };

  const getAllRealtimeDbData = () => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  };

  return (
    <View>
      {/* <HomeScreen /> */}
      {/* <LoginScreen /> */}
      {/* <RegisterScreen /> */}
      {/* <Navigator /> */}
    </View>
  );
};
