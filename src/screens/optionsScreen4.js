import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

//  Local Imports
import { auth } from "../firebaseconfig";
import { CustomButton } from "../components/customButton";

export const OptionsScreen = ({ navigation }) => {
  useEffect(() => {
    // function to load here
    if (auth != null) {
      // console.log("Options Screen : User Present");
      // console.log("UID: " + auth.currentUser.uid);
    } else {
      console.log("Options Screen : User Not Present");
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
        <CustomButton title="Update" type="block" />
        <CustomButton title="Delete" type="block" />
      </View>

      <CustomButton
        title="SignOut"
        onPress={() => {
          auth.signOut();
          navigation.replace("HomeScreen");
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
