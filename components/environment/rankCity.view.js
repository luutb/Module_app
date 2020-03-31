import React,{Component} from 'react'
import {View,Text,Image} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import Header from '../header/Header.view'

export default class CityView extends Component{

    getColor(value){
        
      
        if (value != null ){
                if(value<=50){
                    console.log(value)
                    return '#00FF00'
                }
               else if(value<=100){
                    
                return '#FF9900'
                }
                else if(value<=200){
                    
                    return '#FF0000'
                }
                else{
                                   
                    return '#660033'
                }
         }
        
    }
    render(){
        return(
            <View>
                <Header title="CiTy Rank"
                    {...this.props}></Header>
                <FlatList
                data={this.props.data}
                renderItem = {({item})=>(
                    <TouchableOpacity onPress={()=>this.setClick(item.id)}>
                        <View style={{flex:1, flexDirection:'row',padding:10}}>
                            <Image source={{uri:item.flagURL, height:50, width: 70}}></Image>
                            <View style={{flex:1, justifyContent:'center'}}>
                                <Text style={{alignContent:'center',textAlign:'center',fontWeight:'bold'}}>{item.city}</Text>
                            </View>
                            <View style={{flex:0.5,backgroundColor:this.getColor(item.aqi),justifyContent:'center'}}>
                                <Text style={{alignContent:'center',textAlign:'center'}}>{item.aqi}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
                    }
                ></FlatList>
            </View>
        )
        
    }
    setClick(id){
        this.props.onSubmit(id)
    }
}