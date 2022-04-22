import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import { doc, setDoc } from "firebase/firestore";

import { myfirestore } from "../../../firebaseconfig";
import { CustomButton } from "../../../components/customButton";
import CustomInput from "../../../components/customInput";

export const UpdateInput = ({ route, navigation }) => {
  const { collName, docName, data } = route.params;

  // STATE Variables
  const [cName, setCName] = useState(null);
  const [dName, setDName] = useState(null);
  const [fName, setFName] = useState(null);
  const [vName, setVName] = useState(null);
  const [status, setStatus] = useState("Update Firestore Record");
  const [keys, setKeys] = useState("");
  const [values, setValues] = useState("");

  //   TEXT FIELD REFERENCES
  const ref_field1 = useRef();
  const ref_field2 = useRef();
  const ref_field3 = useRef();
  const ref_field4 = useRef();

  const createAlert = (title, desc) => {
    var text = "Try Again";
    if (title == "Success") {
      text = "Ok";
    }
    Alert.alert(title, desc, [
      {
        text: text,
        onPress: () => {
          if (title == "Success") {
            navigation.goBack();
          }
        },
      },
    ]);
  };

  const seperateData = () => {
    // console.log("data", data);
    var kVal = "";
    var vVal = "";
    data.forEach((item) => {
      vVal = vVal + item.name + "\n";
      kVal = kVal + item.id + "\n";
    });
    // console.log("Keys ", kVal);
    // console.log("Values ", vVal);
    setKeys(kVal);
    setValues(vVal);
  };

  const checkData = () => {
    setStatus("Updating Firestore Record...");
    var docArr = {};
    if (
      keys == null ||
      keys.trim().length == 0 ||
      values == null ||
      values.trim().length == 0
    ) {
      createAlert("Error", "Fields cannot be empty");
      setStatus("Update Firestore Record");
      return;
    }

    const kArr = keys.trim().split("\n");
    const vArr = values.trim().split("\n");

    if (kArr.length != vArr.length) {
      createAlert("Error", "Key Value pair not matching");
      setStatus("Update Firestore Record");
      return;
    } else {
      kArr.forEach((key, i) => {
        docArr[key] = vArr[i];
      });
      console.log(docArr);
      updateDoc(docArr);
    }
  };

  const updateDoc = (docArr) => {
    const myDoc = doc(myfirestore, collName, docName);
    // const newValue = { value: "Charmander" };
    const mergeValue = false;
    setDoc(myDoc, docArr, { merge: mergeValue })
      .then(() => {
        createAlert("Success", "Data has been updated successfully");
        setStatus("Update Firestore Record");
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    seperateData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Update Firestore Data</Text>

      <View>
        <CustomInput value={collName} ref={ref_field1} editable={false} />
        <CustomInput value={docName} ref={ref_field2} editable={false} />
        <View style={styles.valuesContainer}>
          <TextInput
            placeholder="Field Names"
            multiline={true}
            numberOfLines={5}
            style={styles.valuesTextBox}
            editable={status == "Update Firestore Record" ? true : false}
            onChangeText={(newText) => setKeys(newText)}
            value={keys}
            ref={ref_field3}
          />
          <TextInput
            placeholder="Field Values"
            multiline={true}
            numberOfLines={5}
            style={styles.valuesTextBox}
            editable={status == "Update Firestore Record" ? true : false}
            onChangeText={(newText) => setValues(newText)}
            value={values}
            ref={ref_field4}
          />
        </View>
      </View>

      <View>
        <CustomButton
          title={status}
          type="block"
          onPress={() => checkData()}
          disabled={status == "Update Firestore Record" ? false : true}
        />
        <CustomButton
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
