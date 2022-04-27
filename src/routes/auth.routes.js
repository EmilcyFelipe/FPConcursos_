import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgottenPassword from "../pages/ForgottenPassword";

export default function AuthRoutes() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTitle: "Voltar",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#121212",
            borderBottomWidth: 1,
            borderBottomColor: "#FF5C00",
          },
        }}
      />
      <Stack.Screen
        component={ForgottenPassword}
        name="ForgottenPass"
        options={{
          headerTitle: "Voltar",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#121212",
            borderBottomWidth: 1,
            borderBottomColor: "#FF5C00",
          },
        }}
      />
    </Stack.Navigator>
  );
}
