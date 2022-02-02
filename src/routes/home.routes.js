import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Timeline  from '../pages/Timeline';

export default function HomeRoutes(){
    const HomeStack = createStackNavigator();
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen 
            name='Home' 
            component={Home}
            options={{headerShown: false}}
            />
            <HomeStack.Screen name='Timeline' options={{headerShown: false}} component={Timeline}/>
        </HomeStack.Navigator>
    )
}