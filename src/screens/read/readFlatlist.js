import React from "react";
import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";

export const ReadFlatList = ({ items }) => {
  const renderItem = ({ items }) => (
    <View>
      <Text>Document: {items[0]}</Text>
      {/* {renderRocords(items)} */}
    </View>
  );

  if (items == null || items == undefined) return;
  else {
    console.log("Data received in readflatlist");
    console.log(items);
  }

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
