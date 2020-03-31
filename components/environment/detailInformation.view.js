import React,{Component} from 'react'
import {View,Text,ScrollView,Image} from 'react-native'
import Header from '../header/Header.view'
import style from './style'
import SwitchChart from './chart/chart'

export default class DetailView extends Component
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
       
        if (nProps.current.aqi != null ){
            var value = nProps.current.aqi
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
      
        return(
            <ScrollView>
                <Header {...this.props}
                    title={this.state.title}></Header>
                <View style={style.city_country}>
                    <Text style={style.city}>{this.props.city}</Text>
                    <Text style={style.country}>{this.props.country}</Text>
                </View>
                <View style={{height:150, borderWidth:1, flex:2}}>
                    <View style={[style.view_aqius,{backgroundColor:this.state.backgroundColor}]}> 
                        <Image source={this.state.img} style={style.view_aqius_img}></Image>
                            <View style={style.view_aqius_aqius}>
                                <View style={{flex:0.2}}></View>
                                <View style={{flex:1}}>
                                <Text style={{textAlign:"center"},style.view_aqius_aqius }>{this.props.current.aqi}</Text>
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
                            <Text >{this.props.current.humidity}%</Text>
                        </View>
                        
                    </View>
                    <View style={style.view_contetn}>
                        <Image source={require('../Img/wind.png')} style={style.weather_img}></Image>
                        <View style={style.content_weather}>
                            <Text >(m/s)</Text>
                        </View>
                    </View>
                    <View style={style.view_contetn}>
                        <Image source={require('../Img/ipressure.png')} style={style.weather_img}></Image>
                        <View style={style.content_weather}>
                            <Text >{this.props.current.pressure}(hPa)</Text>
                        </View>
                    </View>
                </View>
                    
                </View>
                <View style={{flex:1, flexDirection:'row', height:100,justifyContent: 'space-evenly', marginTop:20}}>
                    <View style={{}}>
                        <View style={{flex:1}}>
                            <Image></Image>
                            <View><Text>{value.pm[leg-1]}</Text></View>
                        </View>
                        <View style={{flex:1}}>
                            <Image></Image>
                            <View><Text>{value.no2s[leg-1]}</Text></View>
                        </View>
                    </View>
                    <View style={{}}>
                        <View style={{flex:1}}>
                            <Image></Image>
                            <View><Text>{value.pm10s[leg-1]}</Text></View>
                        </View>
                        <View style={{flex:1}}>
                            <Image></Image>
                            <View><Text>{value.cos[leg-1]}</Text></View>
                        </View>
                    </View>
                </View>
                <SwitchChart chart={this.state.chart}></SwitchChart>
                          
            </ScrollView>
        )
        
    }

}