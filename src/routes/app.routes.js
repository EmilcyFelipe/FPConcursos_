import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import Profile from "../pages/Profile";
import ProfileRoutes from "./profile.routes";
import Register from "../pages/Register";
import Concursos from "../pages/Concursos";
import Timeline from "../pages/Timeline";
import HomeRoutes from "./home.routes";

export default function AppRoutes() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="HomeRoutes"
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
      <Drawer.Screen
        name="HomeRoutes"
        component={HomeRoutes}
        options={{ headerShown: false, title: "Início" }}
      />

      <Drawer.Screen
        name="ProfileRoutes"
        options={{ headerShown: false, title: "Perfil" }}
        component={ProfileRoutes}
      />

      <Drawer.Screen
        name="Register"
        component={Register}
        options={{
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTintColor: "#fff",
          title: "Registrar",
        }}
      />

      <Drawer.Screen
        name="Concursos"
        component={Concursos}
        options={{
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTintColor: "#fff",
          title: "Concursos",
        }}
      />
    </Drawer.Navigator>
  );
}
