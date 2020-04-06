import React,{Component} from 'react'
import {View,Text} from 'react-native'
import CalendarView from './Calendar.view'


const months = [1,2,3,4,5,6,7,8,9,10,11,12]
const weak = [31,28,31,30,31,30,31,3130,31,30,31]

export default class CalendarController extends Component
{

    constructor(){
        super();
        this.state={
            day:''
        }
        
    }

    getDay_now(dd,mm,yy){

    var a = Math.floor((14 - mm) / 12);
    var y = yy+4800-a;
    var m = mm+12*a-3;


    var jd = dd + Math.floor((153*m+2)/5) + 365*y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) - 32045;
    if (jd < 2299161) {
        jd = dd + Math.floor((153*m+2)/5) + 365*y + Math.floor(y/4) - 32083;
        
    }
    console.log('jd_get',jd%7)
    return (jd%7);
        
    }

    
    getDayfirst(dd,mm,yy){

        console.log(mm)
        if(mm>=3||m==1){
           var end_day = weak[mm-1]
        
        }
       
        var JMD = this.getDay_now(dd,mm,yy) 


        var result = Array.apply(0, Array(35)).map(function(i){ return 0;});
            for (var i = JMD; i < end_day+JMD; i++) {
                result[i] = (i - JMD) + 1;
            }
            console.log(result)
            return result;
                
    }
    componentDidMount(){
       
    this.setState({day:this.getDayfirst(1,4,2020)})
    }
    render(){
        return(
            <CalendarView day ={this,this.state.day}></CalendarView>
        )
    }
}