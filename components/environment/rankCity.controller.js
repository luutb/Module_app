import React,{Component} from 'react'
import {View,Text} from 'react-native'
import CityView from './rankCity.view'
import * as  CallApi from '../CallApi/ApiEnvironment'

export default class CityController extends Component{

    constructor(){
        super();
        this.state={
            data:''
        }
    }
    componentDidMount(){
        
       let city =[]
        CallApi.getRank().then((response)=>{
            this.setState({data:response})
        })
        
        
    }
    render(){
        return(
            <CityView data={this.state.data}
            {...this.props}
            onSubmit ={this.onSubmit.bind(this)}
            ></CityView>
        )
        
    }
    onSubmit(id){
        this.props.navigation.navigate('Detail',{id:id})
    }
}