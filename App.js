import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { Navigator } from "./src/components/navigator";
import { Homepage } from "./src/homepage";

import { CreateFirestore } from "./src/screens/create/createFirestore";
import { CreateRealtime } from "./src/screens/create/createRealtime";

import { ReadFirestore } from "./src/screens/read/readFirestore";
import { ReadRealtime } from "./src/screens/read/readRealtime";

import { DeleteSelection } from "./src/screens/delete/deleteSelection";
import { DeleteRealtime } from "./src/screens/delete/deleteRealtime";
import { DeleteFirestore } from "./src/screens/delete/deleteFirestore";

import { UpdateFirestore } from "./src/screens/update/updateFirestore";
import { UpdateSelection } from "./src/screens/update/updateSelection";

export default function App() {
  return (
    // <View style={styles.container}>
    //   <StatusBar style="auto" />
    //   <Homepage />
    // </View>

    // ------------------------

    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
