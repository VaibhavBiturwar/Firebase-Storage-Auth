import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { Navigator } from "./src/components/navigator";
import { Homepage } from "./src/homepage";
import { CreateFirestore } from "./src/screens/create/createFirestore";
import { CreateRealtime } from "./src/screens/create/createRealtime";
import { ReadFirestore } from "./src/screens/read/readFirestore";
import { ReadFlatList } from "./src/screens/read/readFlatlist";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ReadFirestore />
      {/* <ReadFlatList /> */}
    </View>

    // ------------------------

    // <NavigationContainer>
    //   <Navigator />
    // </NavigationContainer>
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
