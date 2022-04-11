import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { CustomButton } from "../components/customButton";
import { auth } from "../firebaseconfig";

export const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    // function to load here

    console.log(auth);
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
            navigation.replace("LoginScreen");
          }}
        />
        <CustomButton
          title="Register"
          type="block"
          onPress={() => {
            navigation.replace("RegisterScreen");
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
