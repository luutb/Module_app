import React,{Component} from 'react'
import {View,Text,Image,FlatList} from 'react-native'
import Header from '../header/Header.view'
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class RankView extends Component
{
     constructor(){
         super();
         this.state= {
             title:'Xếp Hạng',
             datas:'',
             backgroundColor:''
         }
     }
   
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
       console.log('window', window.value)
        return(
            <View>
                <Header title={this.state.title}></Header>
                <FlatList
                    data={this.props.data}
                    renderItem={({ item }) =>  (
                    <View>
                        <TouchableOpacity onPress={()=>this.setClick(item.id)}>
                           
                            <View style={{flexDirection:'row',padding:10}}>
                                    <Image source={{uri:item.flagURL}} style={{height:50,width:80}}></Image>
                                    <View style={{flex:1, justifyContent:'center'}}>
                                        <Text style={{alignContent:'center',textAlign:'center',fontWeight:'bold'}}>{item.country}</Text>
                                    </View>
                                    <View style={{flex:0.5,backgroundColor:this.getColor(item.aqi),justifyContent:'center'}}>
                                        <Text style={{alignContent:'center',textAlign:'center'}}>{item.aqi}</Text>
                                    </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    )}
                
                />              
            </View>
        )
    }
    setClick(id){
        this.props.setCountry(id)
    }
}