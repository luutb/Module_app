import React,{Component} from 'react'
import {View,Text} from 'react-native'
import MainView from './Main.view'
import { Switch } from 'react-native-gesture-handler'


export default class MainController extends Component
{
    render(){
        return(
            <MainView
            onClick = {this.onCLick.bind(this)}
            ></MainView>
        )
    }
    onCLick(id){
        switch(id){
            case 1:
                {
                    this.props.navigation.navigate("MenuLeft",{key:1});
                    break;
                }
            case 2:
                {
                    this.props.navigation.navigate("MenuLeft",{key:2});
                    break;
                }
            case 3:
                {
                    this.props.navigation.navigate("MenuLeft",{key:3});
                    break;
                }
            case 4:
                {
                    this.props.navigation.navigate("MenuLeft",{key:4});
                    break;
                }
            
        }
    }
}