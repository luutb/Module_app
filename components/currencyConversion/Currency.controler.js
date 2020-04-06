import React,{Component} from 'react'
import {View,Text} from 'react-native'
import CurrencyView from './Currency.view';
import *as CallApi from '../CallApi/CurrencyConvert'


export default class CurrencyController extends Component
{
    constructor(props){
        super(props);
        this.state = {
          data:""
        }
     }


    componentDidMount(){
        CallApi.ConvertCurr().then((response)=>{
           // console.log(response.rates)

           
        })
           
    
    }
    render(){
        return(
            <CurrencyView {...this.props}></CurrencyView>
        )
    }
}