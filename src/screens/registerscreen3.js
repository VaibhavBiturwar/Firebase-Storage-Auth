import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { auth, db } from "../firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

// yarn add @react-native-community/datetimepicker
import DateTimePicker from "@react-native-community/datetimepicker";
// yarn add react-native-switch-selector
import SwitchSelector from "react-native-switch-selector";

// Local Imports
import { CustomButton } from "../components/customButton";
import CustomInput from "../components/customInput";

export const RegisterScreen = ({ navigation }) => {
  // State Variables
  const [fName, setFName] = useState(null);
  const [lName, setLName] = useState(null);
  const [email, setEmail] = useState(null);
  const [dob, setDob] = useState("Date of Birth");
  const [gender, setGender] = useState("male");
  const [pass, setPass] = useState(null);
  const [cPass, setCPass] = useState(null);

  // Field references
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();

  // For date picker
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const [status, setStatus] = useState("Register");

  const male_icon = require("../../assets/male.png");
  const female_icon = require("../../assets/female.png");

  // Functions
  const registerUser = () => {
    setStatus("Registering...");
    // console.log(email + " " + pass + " " + cPass);

    if (
      fName == null ||
      fName.trim().length == 0 ||
      lName == null ||
      lName.trim().length == 0 ||
      email == null ||
      email.trim().length == 0 ||
      dob == "Date of Birth"
    ) {
      Alert.alert("Error", "Please provide all values", [
        {
          text: "Try Again",
          onPress: () => {
            setStatus("Register");
            return;
          },
        },
      ]);
    } else if (pass == cPass) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          console.log("New User Created :");
          // save data from here using user id
          setUserDetails();
          // setNewAccountStatus("New User Created");
          Alert.alert("Success", "User Created", [
            {
              text: "Login to proceed",
              onPress: () => {
                navigation.replace("LoginScreen"); // ! login check
                navigation;
                return;
              },
            },
          ]);
        })
        .catch((e) => {
          setStatus("Register");
          // console.log("User not created ", e.toString());
          const message = "User not created\n" + e.toString().split(" ")[3];
          Alert.alert("Error", message, [
            {
              text: "Try Again",
              onPress: () => {
                return;
              },
            },
          ]);
        });
    } else {
      setStatus("Register");
      Alert.alert("Error", "Password did not match", [
        {
          text: "Try Again",
          onPress: () => {
            return;
          },
        },
      ]);
    }
  };

  const selectDOB = (event, selectedDate) => {
    setOpenDatePicker(false);
    const tempD = new Date(selectedDate);
    const formatedDOB =
      tempD.getDate() +
      "/" +
      (tempD.getMonth() + 1) +
      "/" +
      tempD.getFullYear();
    console.log(formatedDOB);
    setDob(formatedDOB);
  };

  const setUserDetails = () => {
    // send user details to firebase
    // const val = Math.random().toString(36).substring(2, 12);
    const timestamp = new Date();
    set(ref(db, "users/" + auth.currentUser.uid), {
      fname: fName,
      lname: lName,
      email: email,
      dob: dob,
      gender: gender,
      registerDate: timestamp.toDateString(),
      saveTimestamp: timestamp.getTime(),
    });
  };

  // Return
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Register</Text>

      <View style={styles.inputContainer}>
        <CustomInput
          placeholder="First Name"
          onChangeText={(newText) => setFName(newText)}
          editable={status != "Register" ? false : true}
        />
        <CustomInput
          placeholder="Last Name"
          onChangeText={(newText) => setLName(newText)}
          editable={status != "Register" ? false : true}
        />
        <CustomInput
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="next"
          autoCapitalize="none"
          onChangeText={(newText) => setEmail(newText)}
          editable={status != "Register" ? false : true}
        />

        {/* Date Picker */}
        <CustomButton
          title={dob}
          type="block"
          onPress={() => setOpenDatePicker(true)}
          disabled={status == "Register" ? false : true}
        />
        {openDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode="date"
            is24Hour={false}
            onChange={selectDOB}
            disabled={status == "Register" ? false : true}
          />
        )}

        {/* Gender */}
        <SwitchSelector
          initial={0}
          onPress={(value) => {
            setGender(value);
            // console.log(gender);
          }}
          textColor="#2196F3" //'#7a44cf'
          selectedColor="white"
          buttonColor="#2196F3"
          borderColor="#2196F3"
          fontSize={16}
          buttonMargin={2}
          borderWidth={2}
          // hasPadding
          options={[
            { label: "Male", value: "male", imageIcon: male_icon },
            { label: "Female", value: "female", imageIcon: female_icon },
          ]}
          testID="gender-switch-selector"
          accessibilityLabel="gender-switch-selector"
          disabled={status == "Register" ? false : true}
        />

        <CustomInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(newText) => setPass(newText)}
          editable={status != "Register" ? false : true}
        />
        <CustomInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={(newText) => setCPass(newText)}
          editable={status != "Register" ? false : true}
        />
      </View>
      <View>
        <CustomButton
          disabled={status == "Register" ? false : true}
          title={status}
          type="block"
          onPress={() => {
            registerUser();
            console.log(
              fName +
                " " +
                lName +
                " " +
                dob +
                " " +
                email +
                " " +
                gender +
                " " +
                pass +
                " " +
                cPass
            );
          }}
        />
        <CustomButton
          disabled={status == "Register" ? false : true}
          title="Go Back"
          onPress={() => {
            navigation.pop();
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
});
