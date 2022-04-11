import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import cloneDeep from "lodash/cloneDeep";

import { myfirestore } from "../../firebaseconfig";
import { CustomButton } from "../../components/customButton";
import CustomInput from "../../components/customInput";
import { ReadFlatList } from "./readFlatlist";

import { LogBox } from "react-native";

export const ReadFirestore = ({ navigation }) => {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  LogBox.ignoreLogs(["Warning: ..."]);
  const [docName, setDocName] = useState();
  const [data, setData] = useState(false);
  var docArr = [];
  useEffect(() => {
    // function to load here
    // getAllFirestoreData("Pokemon");
    // console.log(myfirestore.listCollections());
  }, []);

  const getAllFirestoreData = async (docName) => {
    // const coll = collection(myfirestore, "Checking");
    const coll = collection(myfirestore, docName);
    const querySnapshot = await getDocs(coll);
    docArr = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id + " " + Object.keys(doc.data()));
      const keys = Object.keys(doc.data());
      const dArr = [];
      dArr.push(doc.id);
      for (const key of keys) {
        dArr.push({ id: key, name: doc.data()[key] });
      }
      // console.log("aArr:" + dArr);
      docArr.push(dArr);
      // setData((oldData) => [...oldData, dArr]);
    });

    console.log(docArr);
    // console.log("To Json: " + data.json());
    setData(true);
  };

  const renderRocords = (items) => {
    const records = [];
    for (var item in items) {
      records.push(
        <Text>
          {item.id} : {item.name}
        </Text>
      );
    }
    console.log(...records);
    console.log(records.json());
    return records;
  };

  const renderItem = ({ items }) => (
    <View>
      <Text>Document: {items[0]}</Text>
      {/* {renderRocords(items)} */}
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headingText}>Read Firestore</Text>
        <CustomInput
          placeholder="Document Name "
          onChangeText={(newText) => setDocName(newText)}
          onSubmitEditing={() => {
            getAllFirestoreData(docName);
          }}
        />
      </View>
      {data && <ReadFlatList items={docArr} />}

      <CustomButton
        title="Go Back"
        onPress={() => {
          //   navigation.pop();
          console.log(data);
        }}
      />
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
  dataContainer: {
    flex: 0.75,
    minWidth: Dimensions.get("window").width * 0.5,
    backgroundColor: "green",
  },
});
