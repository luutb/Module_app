import React,{Component} from 'react'
import {
    StatusBar,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    PanResponder,
    TouchableOpacity,
    Dimensions,
    ImageBackground
  } from "react-native";
import Icon  from 'react-native-vector-icons/AntDesign'
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import CalendarService from '../../services/CalendarService'

const day = new Date()
const { width, height } = Dimensions.get("window");
const week =['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật']
export default class HomeView extends Component
{     
    constructor(){
        super();
        this.state={
            dd:day.getDate(),
            mm:day.getMonth()+1,
            yy:day.getFullYear(),
            dragged :false,
            week:'',
            dd_lunar:'',
            mm_lunar:''
        }
    }
    calcDate(dd,mm,yy){
       
        let nextMonth = mm + 1 ;
        let nextYear = yy;
        // tháng/năm của tháng trước đó
        let lastMonth =mm - 1;
        let lastYear = yy;
        
        // ngay bat dau cua thang truoc
        var jd1 = this.jdn(1, lastMonth, lastYear);
        //ngay bat dau cua thang sau
        var jd2 = this.jdn(1, nextMonth, nextYear);
        var jd = this.jdn(1,mm,yy)
       

        // so ngay thang trc
        var jd_last =jd - jd1
        var jd_next = jd2 - jd
        
     
        if(dd<1){     
                console.log('day',jd_last)  
                dd =  jd_last                      
                    if (lastMonth  <= 0){
                        lastMonth = 12;
                        lastYear--;
                        this.setState({dd:dd,mm:lastMonth,yy:lastYear});
                    }
                this.setState({dd:dd,mm:lastMonth,yy:yy});
                lastMonth -- ;
        }             

    }   
    calcDate_2(dd,mm,yy){
       
        let nextMonth = mm + 1 ;
        let nextYear = yy;
        // tháng/năm của tháng trước đó
        let lastMonth =mm - 1;
        let lastYear = yy;
        
        // ngay bat dau cua thang truoc
        var jd1 = this.jdn(1, lastMonth, lastYear);
        //ngay bat dau cua thang sau
        var jd2 = this.jdn(1, nextMonth, nextYear);
        var jd = this.jdn(1,mm,yy)
       
        
        // so ngay thang trc
        var jd_last =jd - jd1
        var jd_next = jd2 - jd
        
     
        if(dd>jd_next){     
                console.log('day',jd_last)  
                dd =  1                      
                    if (nextMonth > 12){
                        nextMonth = 1;
                        nextYear++;
                        
                    }
                this.setState({dd:dd,mm:nextMonth,yy:yy});
                lastMonth ++ ;
        }             

    }
    getDirectionAndColor = ({ moveX, moveY, dx, dy }) => {
        if( this.state.dragged){
            return;
        }
        const draggedLeft = dx < -200;
        const draggedRight = dx > 200;
   
        if (draggedLeft || draggedRight) {
         this.state.dragged = true;
          if (draggedLeft) {
              
              this.setState({
                  dd:this.state.dd+1
              })
              this.calcDate_2(this.state.dd+1,this.state.mm,this.state.yy)
              this.getWeek(this.state.dd+1,this.state.mm,this.state.yy)
              this.getLunarDay(this.state.dd+1,this.state.mm,this.state.yy)
             
          }
          if (draggedRight) {
            this.setState({
                dd:this.state.dd-1
            })
            this.calcDate(this.state.dd-1,this.state.mm,this.state.yy)
            this.getWeek(this.state.dd-1,this.state.mm,this.state.yy)
            this.getLunarDay(this.state.dd-1,this.state.mm,this.state.yy)
          
            }
        }
        if (this.state.dd) return this.state.dd;
      };
      
    jdn(dd,mm,yy){
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
    getWeek(dd,mm,yy){
        var jd = this.jdn(dd,mm,yy)%7
        var getweek = week[jd]
        this.setState({week:getweek})
    }
    getLunarDay(dd,mm,yy){
        var lunar = CalendarService.getLunarDate(dd,mm,yy)
        console.log(lunar)
        this.setState({dd_lunar:lunar.day,mm_lunar:lunar.month})
    }
      componentWillMount() {
        this._panResponder = PanResponder.create({
          onMoveShouldSetPanResponder: (evt, gestureState) => {
            this.state.dragged = false;
              return !!this.getDirectionAndColor(gestureState)},
          onPanResponderMove: (evt, gestureState) => {
            this.getDirectionAndColor(gestureState);
           
          },
          onPanResponderTerminationRequest: (evt, gestureState) => true,
        });
      }
    componentDidMount(){
        this.getWeek(this.state.dd,this.state.mm,this.state.yy)
        this.getLunarDay(this.state.dd,this.state.mm,this.state.yy)
    }
    render(){
        
        return(
            
            <View style={{flex:1,}}  {...this._panResponder.panHandlers}>
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
                            <TouchableOpacity>
                                <Text style={[style.viewcontent,style.text,{textAlign:'center', fontWeight:'bold'}]}>{this.state.dd+'-'+this.state.mm+'-'+this.state.yy}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1.5}}>
                            <Text  style={[style.viewcontent,{textAlign:'right'}]}>Sự kiện</Text>
                        </View>
                    </View>
                    <View style={{flex:11}}>
                        <View style={{flex:8}}>
                            <View>
                                <Text style={style.textday}>{this.state.dd}</Text>
                            </View>
                           
                            <View>
                                <Text style={style.textweek}>{this.state.week}</Text>
                            </View>
                        </View>
                        <View style={{flex:2, flexDirection:'row', backgroundColor:'#FFFFFF'}}>
                            <View style={{flex:1, borderWidth:1, justifyContent:'center'}}>
                                <Text style={{fontSize:30,fontWeight:'300', textAlign:'center'}}>Ngày</Text>
                                <Text style={{fontSize:40,fontWeight:'300', textAlign:'center', color:'red'}}>{this.state.dd_lunar}</Text>
                            </View>
                            <View style={{flex:1, borderWidth:1,justifyContent:'center'}}>
                                <Text style={{fontSize:30,fontWeight:'300', textAlign:'center'}}>Tháng</Text>
                                <Text style={{fontSize:40,fontWeight:'300', textAlign:'center', color:'red'}}>{this.state.mm_lunar}</Text>
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