import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconfig";

import { CustomButton } from "../components/customButton";
import CustomInput from "../components/customInput";

export const LoginScreen = ({ navigation }) => {
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [status, setStatus] = useState("Login");

  const createAlert = (error) => {
    Alert.alert("Login Failed", error, [
      {
        text: "OK",
        onPress: () => {
          ref_input1.current.clear();
          ref_input2.current.clear();
        },
      },
    ]);
  };

  const signIn = () => {
    //   admin@admin.com 1234567890
    console.log("Signing in....");
    setStatus("Signing in....");
    setTimeout(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          console.log("user Authenticated");
          setStatus("Signed in Successfully");
          navigation.replace("OptionsScreen");
        })
        .catch((e) => {
          //   console.log(e);
          //   console.log(e.toString().split("/")[1].split(")")[0]);
          console.log(
            "Signing Failed: " + e.toString().split("/")[1].split(")")[0]
          );
          setStatus("Login");
          createAlert(e.toString().split("/")[1].split(")")[0]);
        });
    }, 5000);
  };

  navigation.onBack = () => {
    navigation.replace("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Login</Text>

      <View style={styles.inputContainer}>
        <CustomInput
          placeholder="Enter your email"
          keyboardType="email-address"
          returnKeyType="next"
          autoCapitalize="none"
          autofocus={true}
          editable={status == "Login" ? true : false}
          ref={ref_input1}
          onSubmitEditing={() => {
            console.log("OnSubmit :" + email);
            ref_input2.current.focus();
          }}
          onChangeText={(newText) => {
            setEmail(newText);
          }}
        />
        <CustomInput
          placeholder="Enter your password"
          secureTextEntry={true}
          editable={status == "Login" ? true : false}
          ref={ref_input2}
          onSubmitEditing={() => {
            if (email != null || password != null) {
              console.log(email + " " + password);
              signIn();
            }
          }}
          onChangeText={(newText) => {
            setPassword(newText);
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title={status}
          disabled={
            email == null || password == null || status != "Login"
              ? true
              : false
          }
          type="block"
          onPress={() => {
            console.log(email + " " + password);
            signIn();
          }}
        />

        <CustomButton
          title="Check user"
          onPress={() => {
            console.log("Uid: " + auth.currentUser.uid);
            console.log(...auth.currentUser.providerData);
          }}
        />
        <CustomButton
          title="Go Back"
          onPress={() => {
            navigation.navigate("HomeScreen", auth);
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
    justifyContent: "space-evenly",
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

  inputContainer: {
    height: "50%",
    justifyContent: "center",
  },
  buttonContainer: {
    justifyContent: "space-around",
  },
});
