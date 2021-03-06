import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetailContainer from "../screens/Detail/DetailContainer";
import Tabs from "./Tabs";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black",
        shadowColor: "black",
      },
      headerTintColor: "white",
      headerBackTitleVisible: false,
    }}
  >
    <Stack.Screen name="Tabs" component={Tabs}></Stack.Screen>
    <Stack.Screen name="Detail" component={DetailContainer}></Stack.Screen>
  </Stack.Navigator>
);