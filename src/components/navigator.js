// yarn add @react-navigation/native-stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Local imports
import { HomeScreen } from "../screens/homescreen1";
import { LoginScreen } from "../screens/loginscreen2";
import { RegisterScreen } from "../screens/registerscreen3";
import { OptionsScreen } from "../screens/optionsScreen4";

import { CreateSelection } from "../screens/create/createSelection5";
import { CreateFirestore } from "../screens/create/createFirestore";
import { CreateRealtime } from "../screens/create/createRealtime";

import { ReadSelection } from "../screens/read/readSelection";
import { ReadFirestore } from "../screens/read/readFirestore";
import { ReadRealtime } from "../screens/read/readRealtime";

import { UpdateSelection } from "../screens/update/updateSelection";
import { UpdateRealtime } from "../screens/update/updateRealtime";
import { UpdateFirestore } from "../screens/update/updateFirestore";
import { UpdateInput } from "../screens/update/screen/updateInput";

import { DeleteSelection } from "../screens/delete/deleteSelection";
import { DeleteFirestore } from "../screens/delete/deleteFirestore";
import { DeleteRealtime } from "../screens/delete/deleteRealtime";

export const Navigator = () => {
  const HomeStack = createNativeStackNavigator();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // initialRouteName={"OptionsScreen"}
      // initialRouteName={"UpdateSelection"}
    >
      {/* <HomeStack.Screen name="OptionsScreen" component={OptionsScreen} /> */}
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="LoginScreen" component={LoginScreen} />
      <HomeStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <HomeStack.Screen name="OptionsScreen" component={OptionsScreen} />

      <HomeStack.Screen name="CreateSelection" component={CreateSelection} />
      <HomeStack.Screen name="CreateFirestore" component={CreateFirestore} />
      <HomeStack.Screen name="CreateRealtime" component={CreateRealtime} />

      <HomeStack.Screen name="ReadSelection" component={ReadSelection} />
      <HomeStack.Screen name="ReadFirestore" component={ReadFirestore} />
      <HomeStack.Screen name="ReadRealtime" component={ReadRealtime} />

      <HomeStack.Screen name="UpdateSelection" component={UpdateSelection} />
      <HomeStack.Screen name="UpdateFirestore" component={UpdateFirestore} />
      <HomeStack.Screen name="UpdateRealtime" component={UpdateRealtime} />
      <HomeStack.Screen name="UpdateInput" component={UpdateInput} />

      <HomeStack.Screen name="DeleteSelection" component={DeleteSelection} />
      <HomeStack.Screen name="DeleteFirestore" component={DeleteFirestore} />
      <HomeStack.Screen name="DeleteRealtime" component={DeleteRealtime} />
    </HomeStack.Navigator>
  );
};
