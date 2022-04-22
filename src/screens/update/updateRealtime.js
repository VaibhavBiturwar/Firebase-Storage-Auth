import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const UpdateRealtime = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Update Realtime Database</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
