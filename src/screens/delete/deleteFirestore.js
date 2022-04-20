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
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

import { myfirestore } from "../../firebaseconfig";
import { CustomButton } from "../../components/customButton";
import CustomInput from "../../components/customInput";
import { CustomText } from "../../components/customText";

export const DeleteFirestore = ({ navigation }) => {
  const [docName, setDocName] = useState();
  const [dataArr, setDataArr] = useState([]);

  var docArr = [];
  useEffect(() => {
    // function to load here
    // getAllFirestoreData("Pokemon");
    // console.log(myfirestore.listCollections());
  }, []);

  const createAlert = (doc1Name) => {
    Alert.alert(
      "Are you sure",
      `You want to delete this record from Firestore\n! All The data from ${doc1Name} object will be deleted.
      `,
      [
        {
          text: "No",
          onPress: () => {},
        },
        {
          text: "Yes",
          onPress: () => {
            //   Delete data from firestore and load again
            const myDoc = doc(myfirestore, docName, doc1Name);
            deleteDoc(myDoc)
              .then(console.log("Deleted", doc1Name))
              .catch((err) => {
                console.log("ERROR----------------------------", err);
              });
            populateData(docName);
          },
        },
      ]
    );
  };

  const RenderRocords = ({ item }) => {
    const title = item[0].doc;
    return (
      <TouchableOpacity
        onPress={() => {
          //   createAlert(item[0].doc, item.id, item.name);
          createAlert(title);
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

  const populateData = async (docName) => {
    var count = 0;
    const coll = collection(myfirestore, docName);
    const querySnapshot = await getDocs(coll);
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
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headingText}>Delete from Firestore</Text>
        <CustomInput
          placeholder="Document Name "
          onChangeText={(newText) => setDocName(newText)}
          onSubmitEditing={async () => {
            populateData(docName);
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
  },
  listItem: {
    fontSize: 16,
    fontFamily: "serif",
    overflow: "hidden",
  },
});
