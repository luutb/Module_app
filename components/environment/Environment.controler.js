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
       weather:'',
       value:''
    }
}
    componentDidMount(){
       
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
           console.log('vi tri', location)
            
            CallApi.ApiTest({lat:location.latitude,lon:location.longitude,key:KEY}).then((response)=>{
             
               
                this.setState({data:response.data,pollution:response.data.current.pollution,weather:response.data.current.weather})
           
            })

            CallApi.ApiChart().then((response)=>{
               
                var hours = response.measurements.hourly; 
                pm =  []
                aqis = []
                date = []
                cos=[]
                pm10s=[]
                no2s=[];
                var num = 0;
                for (var i = hours.length-1;num < 10;i--){

                    let k = hours[i];

                    if (k.no2 == null || k.pm25 == null || k.pm10 == null|| k.co==null)
                        continue;

                    num++
                    aqis.push(k.aqi); 
                    // no2
                    no2s.push(k.no2.concentration);
                    // pm 25
                    pm.push(k.pm25.concentration);
                    //pm 10
                    pm10s.push(k.pm10.concentration);
                    // no2
                    // co
                    cos.push(k.co.concentration)
 
                    let currentDate = new Date( k.ts );                  
                    var strTime = currentDate.getHours()+":"+currentDate.getMinutes();
                    date.push(strTime);
                }
            
                aqis = aqis.reverse();
                date = date.reverse();
                pm=pm.reverse();
                pm10s=pm10s.reverse();
                no2s=no2s.reverse();
                cos=cos.reverse();


                //lay phan tu cuoi cung
                
                var leg = hours.length -1;
                
                var pm10_now = hours[leg].pm10.concentration;
                var aqi_now = hours[leg].aqi;
                var pm25_now = hours[leg].pm25.concentration;
               
              
                // pm10s=pm10s.reverse();
                // co=co.reverse();
                // no2=no2.reverse();
                this.setState({chart:{aqis,date,pm,pm10s,no2s,cos},value:{pm10_now,aqi_now}});

            })
            CallApi.getCity({lat:location.latitude,lon:location.longitude}).then((response)=>{

                location=[];
                location.push(response.results)
               
            })
           
        })
        .catch(error => {          
            console.log('loi', error);
        })  
     
      
    }
    
  
    render(){     
        
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