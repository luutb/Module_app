import React,{Component} from 'react'
import {View,Text,ScrollView,Image,Dimensions} from 'react-native'
import Header from '../header/Header.view'
import style from './style'
import SwitchChart from './chart/chart'
import {
    LineChart 
  } from "react-native-chart-kit";
import { TouchableOpacity } from 'react-native-gesture-handler'
export default class EnvironmentView extends Component
{
    constructor(props){
        super(props)
        this.state={
            title:"Môi trường",
            backgroundColor:'',
            note:'',
            img:require('../Img/face_luu.png'),
            chart:{
                date:["n/a"],
                aqis:[0],
                pm:[0],
                cos:[0],
                no2s:[0],
                pm10s:[0]
              
            },
            value:{
                aqi_now:[0],
                pm10_now:[0]
            }
        }
       
    }
    
    componentWillReceiveProps(nProps){
        if (nProps.data.current != null ){
            var value = nProps.data.current.pollution.aqius
                if(value<=50){
                    
                    this.setState({backgroundColor:'#CC0000', note:'Tốt'})
                }
               else if(value<=100){
                    
                    this.setState({backgroundColor:'#FF9900',note:'Trung Bình',})
                }
                else if(value<=200){
                    
                    this.setState({backgroundColor:'#CC0000', note:'Có hại cho sức khỏe'})
                }
                else{
                                   
                    this.setState({backgroundColor:'#CC0000',note:'Rất có hại cho sức khỏe',img:require('../Img/face_red.png')})
                }
         }
         if (nProps.chart != null){
        
             if (nProps.chart!= null && nProps.chart.aqis != null){
                     this.setState({chart:nProps.chart})
             }
         }
    }
  
    render(){       
     
        let value = this.state.chart;
        let leg = value.pm.length
        console.log(this.props.pollution.aqius)
      
        return(
            
            <ScrollView style={{}}>
                <Header {...this.props}
                    title={this.state.title}></Header>
            <View style={{backgroundColor:"#FFFFFF"}}>
                <View style={style.city_country}>
                    <Text style={style.city}>Hà Nội</Text>
                    <Text style={style.country}>Việt Nam</Text>
                </View>
                <View style={{height:200, flex:2,backgroundColor:"#FFFFFF", borderBottomWidth:0.4,borderBottomColor:'black'}}>
                   
                    <View style={[style.view_aqius,{backgroundColor:this.state.backgroundColor}]}> 
                        <Image source={this.state.img} style={style.view_aqius_img}></Image>
                            <View style={style.view_aqius_aqius}>
                                <View style={{flex:0.2}}></View>
                                <View style={{flex:1}}>
                                    <Text style={{textAlign:"center"},style.view_aqius_aqius }>{this.props.pollution.aqius}</Text>
                                <Text style={{textAlign:"center", }}>AQI US</Text>
                                </View>
                                <View style={{flex:0.3}}></View>
                            </View >
                        <View style={style.view_aqius_note}>
                            <Text style={style.aqius_note}>{this.state.note}</Text>
                        </View>
                    </View>
                <View style={style.view_weather}>
                    <View style={style.view_contetn}>
                        <Image source={require('../Img/humidity.png')} style={style.weather_img}></Image>
                        <View style={style.content_weather}>
                            <Text >{this.props.weather.hu}%</Text>
                        </View>
                        
                    </View>
                    <View style={style.view_contetn}>
                        <Image source={require('../Img/wind.png')} style={style.weather_img}></Image>
                        <View style={style.content_weather}>
                            <Text >{this.props.weather.ws}(m/s)</Text>
                        </View>
                    </View>
                    <View style={style.view_contetn}>
                        <Image source={require('../Img/ipressure.png')} style={style.weather_img}></Image>
                        <View style={style.content_weather}>
                            <Text >{this.props.weather.pr}(hPa)</Text>
                        </View>
                    </View>
                </View>
                    
                </View>
                <View style={{margin:10}}>
                    <View style ={{flex:1}}> 
                        <Text style={{textAlign:'center', fontWeight:'bold',fontSize:20}}>Các chất gây ô nhiễm</Text>
                    </View>
                <View style={{flex:1, flexDirection:'row', marginTop:10}}>
                    
                    <View style={{flex:3,justifyContent:'center'}}>
                        <View style={style.weather_text}>
                            <View><Text style={{color:'red'}}>PM25 µg/m³</Text></View>
                            <View><Text>{value.pm[leg-1]}</Text></View>
                        </View>
                        <View style={style.weather_text}>
                        <View><Text style={{color:'red'}}>NO2 µg/m³</Text></View>
                            <View><Text>{value.no2s[leg-1]}</Text></View>
                        </View>
                    </View>
                    <View style={{flex:3,justifyContent:'center'}}>
                        <View style={style.weather_text}>
                        <View><Text style={{color:'red'}}>PM10 µg/m³</Text></View>
                            <View><Text>{value.pm10s[leg-1]}</Text></View>
                        </View>
                        <View style={style.weather_text}>
                            <View><Text style={{color:'red'}}>CO µg/m³</Text></View>
                            <View><Text>{value.cos[leg-1]}</Text></View>
                        </View>
                    </View>
                </View>
                </View> 
                <View style={{marginTop:20,marginTop:10}}>
                    <Text style={{fontWeight:'bold',fontSize:20, textAlign:'center',marginBottom:20}}>Biểu đồ ô nhiễm</Text>
                    <SwitchChart chart={this.state.chart} ></SwitchChart>
                </View>
                </View> 
                      
            </ScrollView>
        )
        
    }
}