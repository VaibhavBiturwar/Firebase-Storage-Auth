import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Dimensions } from "react-native";
import { ref, set } from "firebase/database";

import CustomInput from "../../components/customInput";
import { CustomButton } from "../../components/customButton";
import { db } from "../../firebaseconfig";

export const CreateRealtime = ({ navigation }) => {
  const [id1, setId1] = useState(null);
  const [id2, setId2] = useState(null);
  const [fName, setFName] = useState(null);
  const [vName, setVName] = useState(null);
  const [status, setStatus] = useState("Create Realtime DB Record");

  //   TEXT FIELD REFERENCES
  const ref_field1 = useRef();
  const ref_field2 = useRef();
  const ref_field3 = useRef();
  const ref_field4 = useRef();

  //  functions
  const createAlert = (title, desc) => {
    var text = "Try Again";
    if (title == "Success") {
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
    setStatus("Creating Realtime DB Record...");
    if (
      id1 == null ||
      id1.trim().length == 0 ||
      id2 == null ||
      id2.trim().length == 0 ||
      fName == null ||
      fName.trim().length == 0 ||
      vName == null ||
      vName.trim().length == 0
    ) {
      createAlert("Error", "Fields cannot be empty");
      setStatus("Create Realtime DB Record");
      return;
    }

    const fArr = fName.split("\n");
    const vArr = vName.split("\n");
    var docArr = {};
    if (fArr.length == vArr.length) {
      console.log("Length same");
      fArr.forEach((key, i) => {
        docArr[key] = vArr[i];
      });

      const timestamp = new Date();
      set(ref(db, id1 + "/" + id2), {
        ...docArr,
        saveTimestamp: timestamp.getTime(),
      })
        .then((value) => {
          console.log("Success");
          ref_field1.current.clear();
          ref_field2.current.clear();
          ref_field3.current.clear();
          ref_field4.current.clear();
          createAlert(
            "Success",
            "Record created in Realtime Database Successfully"
          );
          setStatus("Create Realtime DB Record");
          setAutoId();
        })
        .catch((error) => {
          console.log("Data Create Failure", error);
          createAlert("Error", error[0]);
          setStatus("Create Realtime DB Record");
        });
    } else {
      createAlert("Error", "Please provide value for every field");
      setStatus("Create Realtime DB Record");
    }
  };

  const setAutoId = () => {
    const val = Math.random().toString(36).substring(2, 12);
    setId2(val);
    ref_field2.current.value; // ! delete this line and check
  };

  useEffect(() => {
    // function to load here
    setAutoId();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Create Realtime Database Record</Text>

      <View>
        <CustomInput
          placeholder="Id 1"
          onChangeText={(newText) => setId1(newText)}
          returnKeyType="next"
          ref={ref_field1}
          editable={status == "Create Realtime DB Record" ? true : false}
          onSubmitEditing={() => {
            ref_field2.current.focus();
          }}
        />
        <CustomInput
          // placeholder="Id 2"
          // onChangeText={(newText) => setId2(newText)}
          // returnKeyType="next"
          value={id2}
          ref={ref_field2}
          editable={false}
        />
        <View style={styles.valuesContainer}>
          <TextInput
            placeholder="Field Names"
            multiline={true}
            numberOfLines={5}
            style={styles.valuesTextBox}
            editable={status == "Create Realtime DB Record" ? true : false}
            onChangeText={(newText) => setFName(newText)}
            ref={ref_field3}
          />
          <TextInput
            placeholder="Field Values"
            multiline={true}
            numberOfLines={5}
            style={styles.valuesTextBox}
            editable={status == "Create Realtime DB Record" ? true : false}
            onChangeText={(newText) => setVName(newText)}
            ref={ref_field4}
          />
        </View>
      </View>
      <View>
        <CustomButton
          title={status}
          // title="Create Realtime DB Record"
          type="block"
          onPress={() => createRecord()}
          disabled={status == "Create Realtime DB Record" ? false : true}
        />
        <CustomButton
          title="Go Back"
          disabled={status == "Create Realtime DB Record" ? false : true}
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
