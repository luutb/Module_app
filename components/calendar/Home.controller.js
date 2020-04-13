import React,{Component} from 'react'
import {View,Text}  from 'react-native'
import HomeView from './Home.view'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';

const date = new Date()
const week =['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật']
export default class HomeController extends Component
{
    constructor(){
        super();
        this.state={
            weeks:'',
            dd: date.getDate(),
            mm: date.getMonth()+1,
            yy: date.getFullYear()
            
        }
    }

    getDay_now(dd,mm,yy){
        {
            var a =  Math.floor((14 - mm) / 12);
            var y = yy+4800-a;
            var m = mm+12*a-3;
            var jd = dd + Math.floor((153*m+2)/5) + 365*y +  Math.floor(y/4) -  Math.floor(y/100) +  Math.floor(y/400) - 32045;
            if (jd < 2299161) {
                jd = dd +  Math.floor((153*m+2)/5) + 365*y +  Math.floor(y/4) - 32083;
            }
         
            return jd;
        }
    
    }
    componentDidMount(){
      
        let thu = this.getDay_now(this.state.dd, this.state.mm, this.state.yy) 
        let index = thu % 7
        console.log('did',week[index])
        this.setState({weeks:week[index]})
    }
    render(){
        
        return(
            <HomeView week={this.state.weeks}
                            {...this.props}
            ></HomeView>
        )
    }
    
}