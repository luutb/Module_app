import React,{Component} from 'react'
import {View,Text,Modal,Button,StyleSheet,Image} from 'react-native'
import * as CallApi from '../CallApi/ApiEnvironment'
import RankView from './rankAqi.view'

export default class RankAqiController extends Component
{
constructor(){
    super();
    this.state={
        data:'',
        aqi:''
    }
}
 componentDidMount(){
     CallApi.getRank().then((response)=>{
        let country=[]
        let country_db =[]
        let data =[]
        let ckeck_aqi =[]
        let leg = response.length
        for(var k in response){
            var item = response[k].country
            country.push(item)

        }  
        
        for(var k in country){
            var test = country.indexOf(country[k])
           
            country_db.push(test)
        }

        var arrFilter = country_db.filter((item, index) => country_db.indexOf(item) === index);
 
        for(var  k in arrFilter){
            var db_fake = arrFilter[k]
            var db_auth = response[db_fake]
            data.push(db_auth)
        }
        for(var k  in data){
            var aqi = data[k]
            ckeck_aqi.push(aqi.aqi)
            
        }
        console.log(ckeck_aqi)
        this.setState({data:data,aqi:ckeck_aqi})
     })
 }
    render(){
    
        return(

         <RankView data ={this.state.data}
                    aqi ={this.state.aqi}
                    setCountry={this.setCountry.bind(this)}
                    >

                    </RankView>
        )
    }
    setCountry(id){
        this.props.navigation.navigate('RankCity',{value:id})
    }
}
      
