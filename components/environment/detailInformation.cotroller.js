import React,{Component} from 'react'
import {View,Text} from 'react-native'
import  DetailView from './detailInformation.view'
import * as CallApi from '../CallApi/ApiEnvironment'

export default class DetailController extends Component
{
    constructor(){
        super();
        this.state={
            city:'',
            country:'',
            current:'',
            chart:{},

        }
    }

    componentDidMount(){
        var id = this.props.route.params.id
        console.log(id)
        CallApi.setId(id).then((response)=>{
            
            this.setState({
                city:response.name,
                country: response.country,
                current:response.current
            })
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
    }
    render(){
        return(
            <DetailView
                city={this.state.city}
                country ={this.state.coutry}
                current ={this.state.current}
                chart ={this.state.chart}
            ></DetailView>
        )
    }
}