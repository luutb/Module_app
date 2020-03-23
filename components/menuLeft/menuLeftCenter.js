import React,{Component} from 'react'
import {View,Text} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import EnvironmentController from '../environment/Environment.controler'
import CurrencyController from '../currencyConversion/Currency.controler'

const Drawer = createDrawerNavigator();


export default class MenuLeft extends Component
{

    render(){
        switch(this.props.route.params.key){
            case 1:{
                return(
                    <Drawer.Navigator initialRouteName="Currency">
                        <Drawer.Screen name="Currency" component={CurrencyController}></Drawer.Screen>
                    </Drawer.Navigator>
                 )
            }
            case 2:{
                return(
                    <Drawer.Navigator initialRouteName="Environment">
                        <Drawer.Screen name="Environment" component={EnvironmentController}></Drawer.Screen>         
                    </Drawer.Navigator>
                 )
            }
            case 3:{
                return(
                    <Drawer.Navigator initialRouteName="Environment">
                        <Drawer.Screen name="Environment" component={EnvironmentController}></Drawer.Screen>        
                    </Drawer.Navigator>
                 )
            }
            case 4:{
                return(
                    <Drawer.Navigator initialRouteName="Environment">
                        <Drawer.Screen name="Environment" component={EnvironmentController}></Drawer.Screen>        
                    </Drawer.Navigator>
                 )
            }
        }
        
    }
}