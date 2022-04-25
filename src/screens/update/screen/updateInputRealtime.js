import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import { ref, set } from "firebase/database";

import { db } from "../../../firebaseconfig";
import CustomInput from "../../../components/customInput";
import { CustomButton } from "../../../components/customButton";

export const UpdateInputRealtime = ({ route, navigation }) => {
  const { collName, docName, data } = route.params;

  const [keys, setKeys] = useState(null);
  const [values, setValues] = useState(null);
  const [status, setStatus] = useState("Update Realtime DB Record");

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
    for (const key in data) {
      if (key == "id" || key == "saveTimestamp") continue;
      kVal = kVal + key + "\n";
      vVal = vVal + data[key] + "\n";
    }
    // console.log("Keys ", kVal);
    // console.log("Values ", vVal);
    setKeys(kVal);
    setValues(vVal);
  };

  const checkData = () => {
    setStatus("Updating Realtime DB Record...");

    var docArr = {};
    if (
      keys == null ||
      keys.trim().length == 0 ||
      values == null ||
      values.trim().length == 0
    ) {
      createAlert("Error", "Fields cannot be empty");
      setStatus("Update Realtime DB Record");
      return;
    }

    const kArr = keys.trim().split("\n");
    const vArr = values.trim().split("\n");

    if (kArr.length != vArr.length) {
      createAlert("Error", "Key Value pair not matching");
      setStatus("Update Realtime DB Record");
      return;
    } else {
      kArr.forEach((key, i) => {
        docArr[key] = vArr[i];
      });
      updateDoc(docArr);
    }
  };

  const updateDoc = (docArr) => {
    // console.log("DOc: ", docArr);
    set(ref(db, collName + "/" + docName), docArr)
      .then(() => {
        createAlert("Success", "Data has been updated successfully");
        setStatus("Update Realtime DB Record");
        return;
      })
      .catch((err) => {
        console.log("Error in update RealTime:\n", err);
        setStatus("Update Realtime DB Record");
        return;
      });
  };

  useEffect(() => {
    // function to load here
    seperateData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Update Realtime Database Record</Text>
      <View>
        <CustomInput value={collName} editable={false} />
        <CustomInput value={docName} editable={false} />
        <View style={styles.valuesContainer}>
          <TextInput
            multiline={true}
            numberOfLines={5}
            style={styles.valuesTextBox}
            editable={status == "Update Realtime DB Record" ? true : false}
            onChangeText={(newText) => setKeys(newText)}
            value={keys}
          />
          <TextInput
            placeholder="Field Values"
            multiline={true}
            numberOfLines={5}
            style={styles.valuesTextBox}
            editable={status == "Update Realtime DB Record" ? true : false}
            onChangeText={(newText) => setValues(newText)}
            value={values}
          />
        </View>
      </View>

      <View>
        <CustomButton
          title={status}
          // title="Create Realtime DB Record"
          type="block"
          onPress={() => checkData()}
          disabled={status == "Update Realtime DB Record" ? false : true}
        />
        <CustomButton
          title="Go Back"
          disabled={status == "Update Realtime DB Record" ? false : true}
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
