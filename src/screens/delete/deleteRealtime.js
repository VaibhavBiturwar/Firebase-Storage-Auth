import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import { ref, onValue, remove } from "firebase/database";

import { db } from "../../firebaseconfig";

import { CustomButton } from "../../components/customButton";
import CustomInput from "../../components/customInput";

export const DeleteRealtime = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState();
  const [editing, setEditing] = useState(true);

  const createAlert = (title, desc) => {
    if (title == "Delete") {
      Alert.alert(title, desc, [
        {
          text: "No",
          onPress: () => {},
        },
        {
          text: "Yes",
          onPress: () => {
            // Delete from realtime DB and reload
            const path = search + "/" + desc.split("-")[1];
            remove(ref(db, path))
              .then(() => {
                // Reloading data in List
              })
              .catch((err) => {
                console.log("Error Deleteing from Realtime DB: ", err);
              });
          },
        },
      ]);
    } else {
      var text = "Try Again";
      Alert.alert(title, desc, [
        {
          text: text,
          onPress: () => {},
        },
      ]);
    }
  };

  const getAllRealtimeDbData = (search) => {
    console.log("Search value in Get: ", search);
    setEditing(false);
    const starCountRef = ref(db, "/");
    onValue(starCountRef, (snapshot) => {
      const fbObject = snapshot.child(search).val();
      if (fbObject == null) {
        createAlert("Error", "Document Name Incorrect");
        setEditing(true);
        return;
      }
      setData(
        Object.keys(fbObject).map((key) => {
          fbObject[key].id = key;
          return fbObject[key];
        })
      );
    });
    setEditing(true);
  };

  const RenderRocords = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          createAlert(
            "Delete",
            "Are you sure?\nYou want to delete -" + item.id
          );
        }}
      >
        <View style={styles.listContainer} key={item.id}>
          {Object.entries(item).map((obj) => {
            return (
              <Text key={obj[1]}>
                {obj[0]} : {obj[1]}
              </Text>
            );
          })}
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return <RenderRocords item={item} />;
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headingText}>Delete From Realtime Database</Text>
        <CustomInput
          editable={editing}
          placeholder="Document Name "
          onChangeText={(newText) => setSearch(newText)}
          onSubmitEditing={async () => {
            getAllRealtimeDbData(search);
          }}
        />
      </View>

      {data && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>No Data</Text>}
          showsVerticalScrollIndicator={false}
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
