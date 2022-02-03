import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Timeline  from '../pages/Timeline';
import Subjects from '../pages/Subjects';

export default function HomeRoutes(){
    const HomeStack = createStackNavigator();
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen 
            name='Home' 
            component={Home}
            options={{headerShown: false}}
            />
            <HomeStack.Screen 
            name='Timeline' 
            options={{headerShown: false}} 
            component={Timeline}/>
             <HomeStack.Screen 
            name='Subjects' 
            options={{headerShown: false}} 
            component={Subjects}/>
        </HomeStack.Navigator>
    )
}