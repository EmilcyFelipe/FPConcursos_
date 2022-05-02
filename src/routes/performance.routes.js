import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PerformanceBasis from "../pages/PerformanceBasis";
import Performance from "../pages/Performance";

export default function PerformanceRoutes({ route }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PerformanceBasis"
        initialParams={{ concursoSelected: route.params.concursoSelected }}
        component={PerformanceBasis}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PerformanceHistoric"
        component={Performance}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
