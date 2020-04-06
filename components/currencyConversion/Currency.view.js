import React,{Component} from 'react'
import {View,Text} from 'react-native'
import Header from '../header/Header.view'
import { floor } from 'react-native-reanimated'


const months = [1,2,3,4,5,6,7,8,9,10,11,12]
const weak = [31,28,31,30,31,30,31,3130,31,30,31]
export default class CurrencyView extends Component
{

    constructor(){
        super();
        this.state={
            day:''
        }
        this.day = new Date()
    }


    getDaynow(){
        var day = new Date();
        console.log(day.getDate());
    }
    
    getDayfirst(){
        var day = new Date()
        var year = day.getFullYear();
        console.log(year)
        var year_4 = (year-1)/4;
        
        var year_100 = (year-1)/100;
        var year_400 = (year-1)/400


        var day_th =  ((year)+Math.floor(year_4)-Math.floor(year_100)+Math.floor(year_400)+31+29+31+5)/7
        console.log(day_th)
    
    }
    componentDidMount(){
        this.getDaynow();
       
        this.getDayfirst()
    }
    render(){
        return(
            <View>
                <Header {...this.props}></Header>
                <Text>CurrencyView</Text>
            </View>
        )
    }
}