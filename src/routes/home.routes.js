import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DataHome from "../pages/DataHome";
import Timeline from "../pages/Timeline";
import Subjects from "../pages/Subjects";
import PerformanceBasis from "../pages/PerformanceBasis";
import Performance from "../pages/Performance";

export default function HomeRoutes() {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={DataHome}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Timeline"
        options={{ headerShown: false }}
        component={Timeline}
      />
      <HomeStack.Screen
        name="Subjects"
        options={{ headerShown: false }}
        component={Subjects}
      />
      <HomeStack.Screen
        name="PerformanceBasis"
        options={{ headerShown: false }}
        component={PerformanceBasis}
      />
      <HomeStack.Screen
        name="Performance"
        options={{ headerShown: false }}
        component={Performance}
      />
    </HomeStack.Navigator>
  );
}
