import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export const CustomButton = ({
  title,
  onPress,
  color = "#2196F3",
  type = "outlined",
  disabled,
}) => {
  if (type == "block") {
    return (
      <TouchableOpacity
        style={[
          styles.blockButtonContainer,
          { borderColor: color, backgroundColor: color },
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.blockTitle}>{title}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={[styles.outlineButtonContainer, { borderColor: color }]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.outlineTitle, { color: color }]}>{title}</Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  outlineButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2196F3",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 20,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 5,
    elevation: 5,
    margin: 5,
  },
  outlineTitle: {
    fontSize: 16,
    fontFamily: "serif",
    color: "#2196F3",
  },

  blockButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2196F3",
    borderWidth: 2,
    borderRadius: 20,
    borderStyle: "solid",
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
    paddingVertical: 5,
    elevation: 5,
    margin: 5,
  },
  blockTitle: {
    fontSize: 16,
    fontFamily: "serif",
    color: "white",
  },
});
