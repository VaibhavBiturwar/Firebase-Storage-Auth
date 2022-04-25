import React, { useEffect } from "react";
import { View, Text, StyleSheet, ToastAndroid, Alert } from "react-native";

//  Local Imports
import { auth } from "../firebaseconfig";
import { CustomButton } from "../components/customButton";

export const OptionsScreen = ({ navigation }) => {
  const createAlert = () => {
    Alert.alert("Are you sure", "Signout from Firebase Storage and Auth", [
      {
        text: "No",
        onPress: () => {},
      },
      {
        text: "Yes",
        onPress: () => {
          auth.signOut();
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeScreen" }],
          });
        },
      },
    ]);
  };

  useEffect(() => {
    if (auth != null) {
      console.log("UID: " + auth.currentUser.uid);
      ToastAndroid.show(
        "Logged in as: " + auth.currentUser.email,
        ToastAndroid.LONG
      );
    } else {
      console.log(
        "Options Screen : User Not Present | Navigating to homescreen"
      );
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>
        CRUD Operations on Firebase Databases
      </Text>
      <View>
        <CustomButton
          title="Create"
          type="block"
          onPress={() => {
            navigation.navigate("CreateSelection");
          }}
        />
        <CustomButton
          title="Read"
          type="block"
          onPress={() => {
            navigation.navigate("ReadSelection");
          }}
        />
        <CustomButton
          title="Update"
          type="block"
          onPress={() => {
            navigation.navigate("UpdateSelection");
          }}
        />
        <CustomButton
          title="Delete"
          type="block"
          onPress={() => {
            navigation.navigate("DeleteSelection");
          }}
        />
      </View>

      <CustomButton
        title="SignOut"
        onPress={() => {
          createAlert();
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
});
