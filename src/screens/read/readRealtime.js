import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const ReadRealtime = () => {
  return (
    <View style={styles.container}>
      <Text>Read Realtime</Text>
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
