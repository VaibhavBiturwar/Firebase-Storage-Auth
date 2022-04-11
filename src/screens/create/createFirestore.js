import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Dimensions } from "react-native";
import { doc, setDoc } from "firebase/firestore";

import { myfirestore } from "../../firebaseconfig";
import CustomInput from "../../components/customInput";
import { CustomButton } from "../../components/customButton";

export const CreateFirestore = ({ navigation }) => {
  // STATE Variables
  const [cName, setCName] = useState(null);
  const [dName, setDName] = useState(null);
  const [fName, setFName] = useState(null);
  const [vName, setVName] = useState(null);
  const [status, setStatus] = useState("Create Firestore Record");

  //   TEXT FIELD REFERENCES
  const ref_field1 = useRef();
  const ref_field2 = useRef();
  const ref_field3 = useRef();
  const ref_field4 = useRef();

  const createAlert = (title, desc) => {
    var text = "Try Again";
    if ((title = "Success")) {
      text = "Ok";
    }
    Alert.alert(title, desc, [
      {
        text: text,
        onPress: () => {
          if ((title = "Success")) ref_field1.current.focus();
        },
      },
    ]);
  };

  const createRecord = () => {
    setStatus("Creating Firestore Record...");
    if (
      cName == null ||
      cName.trim().length == 0 ||
      dName == null ||
      dName.trim().length == 0 ||
      fName == null ||
      fName.trim().length == 0 ||
      vName == null ||
      vName.trim().length == 0
    ) {
      createAlert("Error", "Fields cannot be empty");
      setStatus("Create Firestore Record");
      return;
    }

    console.log(cName + " " + dName + " " + fName + " " + vName);
    const fArr = fName.split("\n");
    const vArr = vName.split("\n");
    var docArr = {};
    if (fArr.length == vArr.length) {
      console.log("Length same");
      fArr.forEach((key, i) => {
        docArr[key] = vArr[i];
      });
      // SEND DATA TO CLOUD FIRESTORE
      const myDoc = doc(myfirestore, cName, dName);
      setDoc(myDoc, docArr)
        .then(() => {
          console.log("Success");
          ref_field1.current.clear();
          ref_field2.current.clear();
          ref_field3.current.clear();
          ref_field4.current.clear();
          setStatus("Create Firestore Record");
          createAlert(
            "Success",
            "Record created in Cloud Firestore Successfully"
          );
        })
        .catch((error) => {
          console.log(error);
          setStatus("Create Firestore Record");
        });
    } else {
      createAlert("Error", "Please provide value for every field");
      setStatus("Create Firestore Record");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Create Firestore Record</Text>
      <View>
        <CustomInput
          placeholder="Collection Name"
          onChangeText={(newText) => setCName(newText)}
          returnKeyType="next"
          ref={ref_field1}
          editable={status == "Create Firestore Record" ? true : false}
          onSubmitEditing={() => {
            ref_field2.current.focus();
          }}
        />
        <CustomInput
          placeholder="Document Name"
          onChangeText={(newText) => setDName(newText)}
          returnKeyType="next"
          ref={ref_field2}
          editable={status == "Create Firestore Record" ? true : false}
          onSubmitEditing={() => {
            ref_field3.current.focus();
          }}
        />
        <View style={styles.valuesContainer}>
          <TextInput
            placeholder="Field Names"
            multiline={true}
            numberOfLines={5}
            style={styles.valuesTextBox}
            editable={status == "Create Firestore Record" ? true : false}
            onChangeText={(newText) => setFName(newText)}
            ref={ref_field3}
          />
          <TextInput
            placeholder="Field Values"
            multiline={true}
            numberOfLines={5}
            style={styles.valuesTextBox}
            editable={status == "Create Firestore Record" ? true : false}
            onChangeText={(newText) => setVName(newText)}
            ref={ref_field4}
          />
        </View>
      </View>
      <View>
        <CustomButton
          title={status}
          type="block"
          onPress={() => createRecord()}
          disabled={status == "Create Firestore Record" ? false : true}
        />
        <CustomButton
          title="Go Back"
          disabled={status == "Create Firestore Record" ? false : true}
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
  valuesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  valuesTextBox: {
    textAlignVertical: "top",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 15,
    borderColor: "#2196F3",
    fontSize: 16,
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    minWidth: Dimensions.get("window").width * 0.4,
  },
});
