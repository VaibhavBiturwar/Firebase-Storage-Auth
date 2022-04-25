import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

import { myfirestore } from "../../firebaseconfig";
import { CustomButton } from "../../components/customButton";
import CustomInput from "../../components/customInput";
import { CustomText } from "../../components/customText";

export const UpdateFirestore = ({ navigation }) => {
  const [docName, setDocName] = useState(null);
  const [dataArr, setDataArr] = useState([]);
  const [enable, setEnable] = useState(true);

  const isFocused = useIsFocused();
  var docArr = [];
  useEffect(() => {
    if (isFocused && docName != null) {
      populateData(docName);
    }
  }, [isFocused]);

  const createAlert = (title, desc) => {
    var text = "Try Again";
    if (title == "Success") {
      text = "Ok";
    }
    Alert.alert(title, desc, [
      {
        text: text,
        onPress: () => {
          setEnable(true);
          return;
        },
      },
    ]);
  };

  const RenderRocords = ({ item }) => {
    const title = item[0].doc;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("UpdateInput", {
            collName: docName,
            docName: title,
            data: item,
          });
        }}
      >
        <View style={styles.listContainer}>
          <CustomText title={title} />
          <View>
            {item.map((item) => (
              <Text style={styles.listItem}>
                {item.id} {item.name}
              </Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return <RenderRocords item={item} />;
  };

  const checkInput = () => {
    // console.log("Docname: " + docName);
    setEnable(false);

    if (docName == null || docName.trim().length == 0) {
      createAlert("Error", "Please enter document name to search");
      setEnable(true);
      return;
    }
    populateData(docName);
  };

  const populateData = async (docName) => {
    var count = 0;
    const coll = collection(myfirestore, docName);
    const querySnapshot = await getDocs(coll);
    const dRec = JSON.stringify(querySnapshot._snapshot.docChanges); // * if empty length is 0
    if (dRec.length == 2) {
      console.log("Length: " + dRec.length);
      createAlert("Error", "Incorrect Document Name");
      return;
    }
    docArr = [];
    querySnapshot.forEach((doc) => {
      const keys = Object.keys(doc.data());
      const dArr = [];
      for (const key of keys) {
        dArr.push({ key: count, doc: doc.id, id: key, name: doc.data()[key] });
        count++;
      }
      docArr.push(dArr);
    });
    setDataArr([...docArr]);
    setEnable(true);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headingText}>Update Firestore Data</Text>
        <CustomInput
          editable={enable}
          placeholder="Document Name "
          onChangeText={(newText) => setDocName(newText)}
          onSubmitEditing={async () => {
            // populateData(docName);
            checkInput(docName);
          }}
        />
      </View>
      {dataArr.length > 0 && (
        <FlatList
          data={dataArr}
          renderItem={renderItem}
          keyExtractor={(item) => item[0].key}
          ListEmptyComponent={<Text>No Data</Text>}
        />
      )}

      <CustomButton
        disabled={!enable}
        title="Go Back"
        onPress={() => {
          navigation.pop();
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
    marginTop: StatusBar.currentHeight || 0,
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
  listContainer: {
    minWidth: Dimensions.get("window").width * 0.8,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E34C53",
    marginVertical: 10,
    backgroundColor: "#fffafa",
  },
  listItem: {
    fontSize: 16,
    fontFamily: "serif",
    overflow: "hidden",
  },
});
