import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { CustomButton } from "../../components/customButton";

export const ReadSelection = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Read</Text>
      <View>
        <CustomButton
          title="Cloud Firestore"
          onPress={() => {
            navigation.navigate("ReadFirestore");
          }}
        />
        <CustomButton
          title="Realtime Database"
          onPress={() => {
            navigation.navigate("ReadRealtime");
          }}
        />
      </View>

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
