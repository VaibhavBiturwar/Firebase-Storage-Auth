import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const CustomText = ({ title }) => {
  return (
    <View>
      <Text style={styles.textStyle} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    fontFamily: "serif",
    fontWeight: "bold",
    overflow: "hidden",
  },
});
