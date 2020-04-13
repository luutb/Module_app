import React,{Component} from 'react'
import {View,Text,StyleSheet} from 'react-native'


const style = StyleSheet.create(
    {
        colorsolar_1:{
            textAlign:'center',fontSize:20,fontWeight:"100"
        },
        textsolar:{
            textAlign:'center',fontSize:22,fontWeight:"bold"
        },
        textld:{
            textAlign:'center',fontSize:14,fontWeight:"100"
        },

        headerView:{
            flexDirection:'row',height:40,justifyContent:'space-between'
        },
        text:{
            textAlign:'center',fontSize:18
        },
        viewIcon:{
            justifyContent:'center'
        },
        styleIcon:{

        },
        weekday:{
            flex:1,height:60,width:'100%',margin:1,borderWidth:0.2,justifyContent:'center',backgroundColor:'#FFCC99'
        },
        tableView:{
            flex:1,height:60,width:'100%',margin:1,borderWidth:0.2
        }
    }
)
export default style;