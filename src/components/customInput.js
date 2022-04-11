import React, { forwardRef } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Dimensions } from "react-native";

const MyIp = (props, ref) => {
  return <TextInput style={styles.customInput} {...props} ref={ref} />;
};

const styles = StyleSheet.create({
  customInput: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    margin: 5,
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 25,
    borderColor: "#2196F3",
    fontSize: 16,
    minWidth: Dimensions.get("window").width * 0.8,
  },
});

export default forwardRef(MyIp);
