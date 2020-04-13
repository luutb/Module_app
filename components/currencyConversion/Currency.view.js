import React,{Component} from 'react'
import {View,Text} from 'react-native'
import Header from '../header/Header.view'
import { floor } from 'react-native-reanimated'



export default class CurrencyView extends Component
{

    
    render(){
        return(
            <View>
                <Header {...this.props}></Header>
                <Text>CurrencyView</Text>
            </View>
        )
    }
}