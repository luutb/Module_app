import React,{Component} from 'react'
import {View,Text,StyleSheet, ImageBackground}  from 'react-native'
import Icon  from 'react-native-vector-icons/AntDesign'
import { NavigationContainer, DrawerActions } from '@react-navigation/native';


const day = new Date()
export default class HomeView extends Component
{
    render(){
        console.log(this.props.week)
        return(
            
            <View style={{flex:1,}}>
                <ImageBackground source={require('../../Img/chuot.jpg') } style={style.image}>
                    <View style={style.viewheader}>
                        <View style={{flex:1.5}}>
                            <Icon name="bars"
                            size={30}
                            onPress={()=>this.props.navigation.dispatch(DrawerActions.toggleDrawer())}
                            style={style.viewcontent}
                            
                                ></Icon>
                        </View>
                        <View style={[{flex:2},style.viewdate]}>
                            <Text style={[style.viewcontent,style.text,{textAlign:'center'}]}>{day.getDate()+'-'+day.getMonth()+'-'+day.getUTCFullYear()}</Text>
                        </View>
                        <View style={{flex:1.5}}>
                            <Text  style={[style.viewcontent,{textAlign:'right'}]}>Sự kiện</Text>
                        </View>
                    </View>
                    <View style={{flex:11,}}>
                        <View style={{flex:8}}>
                            <View>
                                <Text style={style.textday}>{day.getDate()}</Text>
                            </View>
                            <View>
                                <Text style={style.textweek}>{this.props.week}</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }

}
const style= StyleSheet.create({
    viewheader:{
        flex:1,flexDirection:'row', justifyContent:'space-between',alignItems:'center'
    },
    viewcontent:{
        
    },
    text:{
        fontSize:20
    },
    viewdate:{
        borderWidth:1,
        borderRadius:10
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
    textday:{     
        fontSize:150,
        color:'red',
        textAlign:'center'
    },
    textweek:{
        fontSize:30,
        textAlign:'center'
    }
})