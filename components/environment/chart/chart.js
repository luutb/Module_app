import React,{Component} from 'react'
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native'
import CharAqi from './charAqi'
import ChartPM from './chartPM'
import CharPM10 from './charPM10'
import CharNo2 from './chartNo2'
import ChartCo from './chartCo'
import style from '../style'
export default class SwitchChart extends Component
{
    constructor(){
        super();
        this.state={
            key:1,
            backgroundColor:'red',
            backgroundColor1:'',
            backgroundColor2:'',
            backgroundColor3:'',
            backgroundColor4:'',


        }
    }

    renderItem(){
       if(this.state.key==1){
           console.log('chay vao day')
           return(
               <View style={{flex:1,backgroundColor:"red"}}>
                    <CharAqi chart={this.props.chart}></CharAqi>
               </View>
           )
       }
       if(this.state.key==2){
        return(
            <View style={{flex:1,backgroundColor:"red"}}>
                 <ChartPM chart={this.props.chart}></ChartPM>
            </View>
        )
        }
        if(this.state.key==3){
            return(
                <View style={{flex:1,backgroundColor:"red"}}>
                     <CharPM10 chart={this.props.chart}></CharPM10>
                </View>
            )
        }  
        if(this.state.key==4){
            return(
                <View style={{flex:1,backgroundColor:"red"}}>
                     <CharNo2 chart={this.props.chart}></CharNo2>
                </View>
            )
        }
        if(this.state.key==5)
        {
            return(
                <View style={{flex:1,backgroundColor:"red"}}>
                    <ChartCo chart={this.props.chart}></ChartCo>
                </View>
            )
        }
    }

    render(){
    return(
        <View>
        <View style={{flex:1,flexDirection:'row',backgroundColor:"#FFFF99",height:40,textAlign:"center",}}>
        <TouchableOpacity style={[style.view_char,{backgroundColor:this.state.backgroundColor}]} onPress={()=>this.setState({key:1,backgroundColor:'red',backgroundColor1:'#FFFF99',backgroundColor2:'#FFFF99',backgroundColor3:'#FFFF99',backgroundColor4:'#FFFF99'})}>
            <Text style={style.char_button}>AQI</Text>
        </TouchableOpacity >
        <TouchableOpacity style={[style.view_char,{backgroundColor:this.state.backgroundColor1}]}  onPress={()=>this.setState({key:2,backgroundColor1:'red',backgroundColor:'#FFFF99',backgroundColor2:'#FFFF99',backgroundColor3:'#FFFF99',backgroundColor4:'#FFFF99'})}>
            <Text style={style.char_button}>PM25</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.view_char,{backgroundColor:this.state.backgroundColor2}]}  onPress={()=>this.setState({key:3,backgroundColor2:'red',backgroundColor:'#FFFF99',backgroundColor1:'#FFFF99',backgroundColor3:'#FFFF99',backgroundColor4:'#FFFF99'})}>
            <Text  style={[style.char_button,{backgroundColor:this.state.backgroundColor2}]}>PM10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.view_char,{backgroundColor:this.state.backgroundColor3}]}  onPress={()=>this.setState({key:4,backgroundColor3:'red',backgroundColor:'#FFFF99',backgroundColor2:'#FFFF99',backgroundColor1:'#FFFF99',backgroundColor4:'#FFFF99'})}>
            <Text  style={[style.char_button,{backgroundColor:this.state.backgroundColor3}]}>No2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.view_char,{backgroundColor:this.state.backgroundColor4}]}  onPress={()=>this.setState({key:5,backgroundColor4:'red',backgroundColor:'#FFFF99',backgroundColor2:'#FFFF99',backgroundColor3:'#FFFF99',backgroundColor1:'#FFFF99'})}>
            <Text  style={[style.char_button,{backgroundColor:this.state.backgroundColor4}]}>Co</Text>
        </TouchableOpacity>
        </View> 
        <View style={{flex:1}}>
            {this.renderItem()}
        </View> 
        </View>
    )
}
}