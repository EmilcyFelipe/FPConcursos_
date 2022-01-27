import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

export default function AppRoutes() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#232323",
        },
        drawerLabelStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
        drawerActiveTintColor: "#fff",
        drawerActiveBackgroundColor: "#FF5C00",
        drawerInactiveBackgroundColor: "#1C1C1C",
        drawerInactiveTintColor: "#fff",
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Register" component={Register} />
    </Drawer.Navigator>
  );
}
