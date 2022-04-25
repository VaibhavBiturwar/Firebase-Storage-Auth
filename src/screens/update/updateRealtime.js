import React, { useState } from "react";
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
import { ref, onValue } from "firebase/database";

import { db } from "../../firebaseconfig";

import { CustomButton } from "../../components/customButton";
import CustomInput from "../../components/customInput";

export const UpdateRealtime = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState(null);
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
            console.log("Delete");
          },
        },
      ]);
    } else {
      var text = "Try Again";
      Alert.alert(title, desc, [
        {
          text: text,
          onPress: () => {
            setEditing(true);
          },
        },
      ]);
    }
  };

  const getAllRealtimeDbData = (search) => {
    setEditing(false);
    if (search == null || search.length == 0) {
      createAlert("Error", "Please enter document name to search");
      return;
    }
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
          navigation.navigate("UpdateInputRealtime", {
            collName: search,
            docName: item.id,
            data: item,
          });
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
        <Text style={styles.headingText}>Update Realtime Database Data</Text>
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
