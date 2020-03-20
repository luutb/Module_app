import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class HeaderView extends Component{

    render()
    {
        return(
           <View style={styles.containerHeader}>
               <View style={styles.iconTab}><Text> <FontAwesome name="bars" size={30} color="#fff" /></Text></View>
               <View style={styles.title}><Text>title</Text></View>
               <View style={styles.iconHome}><Text></Text></View>
           </View>
        );
    }
}

styles = StyleSheet.create({
    containerHeader: {
        height:60,
        backgroundColor:'red',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10,
        justifyContent:'space-between'
    },
    iconTab: {

    },
    title: {

    },
    iconHome: {

    }
});
