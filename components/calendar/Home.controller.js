import React,{Component} from 'react'
import {View,Text, Dimensions, PanResponder}  from 'react-native'
import HomeView from './Home.view'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';

const day = new Date()
const { width, height } = Dimensions.get("window");
const week =['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật']
export default class HomeController extends Component
{
   
    render(){
        
        return(
            <HomeView   {...this.props}
                        
            ></HomeView>
        )
    }
    
}