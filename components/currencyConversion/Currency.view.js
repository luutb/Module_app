import React,{Component} from 'react'
import {View,Text} from 'react-native'
import Header from '../header/Header.view'
import { FloatingAction } from "react-native-floating-action";
const actions = [
    {
      text: "Accessibility",
      name: "bt_accessibility",
      position: 2
    },
    {
      text: "Language",
      name: "bt_language",
      position: 1
    },
    {
      text: "Location",
      name: "bt_room",
      position: 3
    },
    {
      text: "Video",
      name: "bt_videocam",
      position: 4
    }
  ];
export default class CurrencyView extends Component
{

    
    render(){
        return(
            <View style={styles.container}>
            <Text style={styles.example}>Floating Action example</Text>
            <FloatingAction
              actions={actions}
              onPressItem={name => {
                console.log(`selected button: ${name}`);
              }}
            />
          </View>
        )
    }
}