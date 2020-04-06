import React,{Component} from 'react'
import {View,Text, Alert} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'


const weak_day  = ['T2','T3','T4','T5','T6','T7','Cn']
export default class CalendarView extends Component
{
    constructor(){
        super();
        this.state={
            backgroundColor :'#ffffff',
            month:'',
            year:'',
        }
    }

    setDay_now(day_now){
        var date = new Date();
        var day = date.getDate();
        if(day === day_now){
            return 'red'
        }

    }
    componentDidMount(){
        var date = new Date();
        var mm = date.getMonth();
        console.log(mm)
        this.setState({
            month:mm+1,
            year:date.getFullYear()
        })
    }
    
    
    render(){

        return(
            <View style={{flex:1}}>
                <View style={{flexDirection:'row',height:40,justifyContent:'space-between'}}>
                    <View>
                        <Text>Hôm nay</Text>
                    </View>
                    <View>
                        <TouchableOpacity title='abvc'></TouchableOpacity>
                        <Text>Tháng {this.state.month} - {this.state.year}</Text>
                    </View>

                </View>
                <View style={{flexDirection:'row'}}>
                    {weak_day.map(e=><View style={{flex:1,height:60,width:'100%',margin:1,borderWidth:0.2}}>                               
                                         <Text style={{textAlign:'center',fontSize:20,fontWeight:"100"}}>{e}</Text>
                                     </View>)}
                 </View>
                 <View style={{backgroundColor:'#FFFFFF'}}>
                    <FlatList
                    horizontal={false}
                    data={this.props.day}
                    numColumns ='7'
                    renderItem={({item}) =>{
                    return( 
                        <View style={{flex:1,height:60,width:'100%',margin:1,borderWidth:0.2,backgroundColor:this.setDay_now(item)}}>  
                            <TouchableOpacity onPress={()=>Alert.alert('ngay dc chon'+':'+item)}>
                                <View >
                                    <Text style={{textAlign:'center',fontSize:20,fontWeight:"100"}}>{item}</Text>                        
                                </View>
                            </TouchableOpacity>
                        </View>   
                        )}   
                    }></FlatList>
                </View>
            </View>
        )
    }
}