import React,{Component} from 'react'
import {View,TouchableOpacity,Text} from 'react-native'
import CharAqi from './charAqi'
import ChartPM from './chartPM'
import CharPM10 from './charfPM10'

export default class SwitchChart extends Component
{
    constructor(){
        super();
        this.state={
            key:1
        }
    }

    renderItem(){
       if(this.state.key==1){
           console.log('chay vao day')
           return(
               <View style={{flex:1}}>
                    <CharAqi chart={this.props.chart}></CharAqi>
               </View>
           )
       }
       if(this.state.key==2){
        return(
            <View style={{flex:1}}>
                 <ChartPM chart={this.props.chart}></ChartPM>
            </View>
        )
        }
        if(this.state.key==3){
            return(
                <View style={{flex:1}}>
                     <CharPM10 chart={this.props.chart}></CharPM10>
                </View>
            )
        }  
    }

    render(){
    return(
        <View>
        <View style={{flex:1,flexDirection:'row'}}>
        <TouchableOpacity style={{flex:2}} onPress={()=>this.setState({key:1})}>
            <Text>abc</Text>
        </TouchableOpacity >
        <TouchableOpacity style={{flex:2}}  onPress={()=>this.setState({key:2})}>
            <Text>def</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:2}}  onPress={()=>this.setState({key:3})}>
            <Text>adadas</Text>
        </TouchableOpacity>
        </View> 
        <View style={{flex:1}}>
            {this.renderItem()}
        </View> 
        </View>
    )
}
}