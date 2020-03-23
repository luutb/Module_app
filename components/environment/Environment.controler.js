import React,{Component} from 'react'
import {View,Text} from 'react-native'
import EnvironmentView from './Environment.view';
import * as CallApi from '../CallApi/ApiEnvironment'

import GetLocation from 'react-native-get-location'
const KEY = '3fad5db1-51ee-4f4d-a5bf-bc6797d0eb4b'
export default class EnvironmentController extends Component
{
constructor(){
    super();
    this.state={
       data:'',
       current:'',
       pollution:'',
       chart:{},
       weather:''
    }
}
    componentDidMount(){
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
           
            
            CallApi.ApiTest({lat:location.latitude,lon:location.longitude,key:KEY}).then((response)=>{
             
                console.log(response)
                this.setState({data:response.data,pollution:response.data.current.pollution,weather:response.data.current.weather})
           
            })

            CallApi.ApiChart().then((response)=>{
               
                var hours = response.measurements.hourly; 
                pm =  []
                aqis = []
                date = []
                cos=[]
                pm10s=[]
                no2s=[]

                for (var i = hours.length-1;i> hours.length-10;i--){

                    let k = hours[i];
                    aqis.push(k.aqi);

                    // pm 25
                    pm.push(k.pm25.concentration);
                    //pm 10
                    pm10s.push(k.pm10.concentration)

                    let currentDate = new Date( k.ts );                  
                    var strTime = currentDate.getHours()+":"+currentDate.getMinutes();
                    date.push(strTime);


                }
                console.log("PM data ",pm);
                console.log("PM 10 data ",pm10s);
                aqis = aqis.reverse();
                date = date.reverse();
                pm=pm.reverse();
                pm10s=pm10s.reverse()

                // pm10s=pm10s.reverse();
                // co=co.reverse();
                // no2=no2.reverse();
                this.setState({chart:{aqis,date,pm,pm10s}})

            })
            CallApi.getCity({lat:location.latitude,lon:location.longitude}).then((response)=>{

                location=[];
                location.push(response.results)
                console.log('city',location)
            })
           
        })
        .catch(error => {          
            console.log('loi', error);
        })  
     
      
    }
    
  
    render(){     
        console.log('poly',this.state.pollution)
        return(
            
            <EnvironmentView 
                data={this.state.data}
                pollution={this.state.pollution}
                chart = {this.state.chart}
                weather={this.state.weather}
                {...this.props}
                
            ></EnvironmentView>
        )
    }
}