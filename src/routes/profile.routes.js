import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";

export default function ProfileRoutes() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={Profile}
      />
      <Stack.Screen
        name="EditProfile"
        options={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#121212",
          },
          title: "Editar Perfil",
        }}
        component={EditProfile}
      />
    </Stack.Navigator>
  );
}
