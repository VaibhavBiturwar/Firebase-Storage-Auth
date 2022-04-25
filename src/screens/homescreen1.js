import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { onAuthStateChanged } from "firebase/auth";

import { CustomButton } from "../components/customButton";
import { auth } from "../firebaseconfig";

export const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    // function to load here

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("OnAuth: ", user);
        console.log("onAuth ");
        console.log("Navigating to Options Screen");
        navigation.replace("OptionsScreen");
      } else {
        console.log("on Auth False");
      }
    });

    // console.log("Auth in FirstScreen\n", auth);
    if (auth.currentUser != undefined) {
      console.log("Navigating to Options Screen");
      navigation.replace("OptionsScreen");
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Firebase Authentication & Storage</Text>
      <View>
        <CustomButton
          title="Login"
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
        />
        <CustomButton
          title="Register"
          type="block"
          onPress={() => {
            navigation.navigate("RegisterScreen");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  headingText: {
    fontSize: 30,
    fontFamily: "serif",
    textAlign: "center",
    fontWeight: "600",
    textTransform: "uppercase",
    textShadowColor: "#b2b2b2",
    textShadowRadius: 1,
    textShadowOffset: { width: 2, height: 2 },
  },
});
