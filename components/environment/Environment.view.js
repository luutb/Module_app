import React,{Component} from 'react'
import {View,Text,ScrollView,Image,Dimensions} from 'react-native'
import Header from '../header/Header.view'
import style from './style'
import CharAqi from './charAqi'
import ChartPM from './chartPM'
import SwitchChart from './chart'
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
              
            }
        }
       
    }
    
    componentWillReceiveProps(nProps){
        if (nProps.data.current != null ){
                if(nProps.data.current.pollution.aqius<50){
                    console.log(nProps.data.current.pollution.aqius)
                    this.setState({backgroundColor:'#33FF00', note:'Tốt'})
                }
                if(50<nProps.data.current.pollution.aqius<100){
                    console.log(nProps.data.current.pollution.aqius)
                    this.setState({backgroundColor:'#FF6600',note:'Trung Bình',})
                }
                if(100<nProps.data.current.pollution.aqius<=200){
                    console.log(nProps.data.current.pollution.aqius)
                    this.setState({backgroundColor:'#CC0000', note:'Có hại cho sức khỏe'})
                }
                if(nProps.data.current.pollution.aqius>200){
                    console.log(nProps.data.current.pollution.aqius)
                    
                    this.setState({backgroundColor:'#660033',note:'Rất có hại cho sức khỏe',img:require('../Img/face_red.png')})
                }
         }
         if (nProps.chart != null){
             console.log(nProps.chart)
             if (nProps.chart!= null && nProps.chart.aqis != null){
                     this.setState({chart:nProps.chart})
             }
         }
    }
  
    render(){       
        console.log('test',this.state.chart)  
        return(
            <ScrollView>
                <Header {...this.props}
                    title={this.state.title}></Header>
                <View style={style.city_country}>
                    <Text style={style.city}>Hà Nội</Text>
                    <Text style={style.country}>Việt Nam</Text>
                </View>
                <View style={{height:150, borderWidth:1, flex:2}}>
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
                            <Text >{this.props.weather.hu} %</Text>
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
                <SwitchChart chart={this.state.chart}></SwitchChart>
                          
            </ScrollView>
        )
        
    }
}