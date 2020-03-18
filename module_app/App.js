import  { Alert, View } from 'react-native';
import React,{ Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import routers from "./router.config"

const Stack = createStackNavigator();


// redux ... 
console.disableYellowBox = true;
export default class HelloWord extends Component
{ 
  render(){
    return (
              <NavigationContainer>
                  <Stack.Navigator>
                    {routers.map((m)=> (<Stack.Screen name={m.name} component={m.component} options = {m.options} />) )}
                </Stack.Navigator>
              </NavigationContainer>
      

    );
  }
}
   