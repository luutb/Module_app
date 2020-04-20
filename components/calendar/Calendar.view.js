import React,{Component} from 'react'
import {View,Text, Alert,Dimensions,PanResponder} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign';
import style from '../../style/calender/styleCalendar'


const { width, height } = Dimensions.get("window");


const weak_day  = ['CN','T2','T3','T4','T5','T6','T7']
export default class CalendarView extends Component
{
    constructor(){
        super();
        this.state={
            backgroundColor :'#ffffff',
            month:'',
            year:'',
            dragged:false
        }
    }

    setDay_now(day_now){
        var date = new Date();
        var day = date.getDate();
        if(day === day_now){
            return 'red'
        }

    }
    componentDidMount(){
        var date = new Date();
        var mm = date.getMonth();

        this.setState({
            month:mm+1,
            year:date.getFullYear()
        })
    }
    
    
    printCell(item){
        var date = new Date();
        if (item.solar==0){
            return (<Text style={style.colorsolar_1}></Text>)
        }
       
        let color = "#000000";
        if(item.solar==date.getDate()&& this.props.month==date.getMonth()+1){
            color='red'
        }
        if ( item.outner){
            color = "#888888"; // cuoi vao mat
        }
        return (
            <View>
                <Text style={[style.textsolar,{color:color}]}>{item.solar}</Text>
                <Text style={[style.textld,{color:color}]}>{item.ld}</Text>
            </View>
        )
                                        
    }
    showInfo(item){
        var text = this.props.getDayInfo(item.jd);
        alert(text);
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
              
             this.setMonth(2)
          }
          if (draggedRight) {
            this.setMonth(1)         
            }
        }
        if (this.state.dd) return this.state.dd;
      };
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
    render(){

        return(
            <View style={{flex:1}}>
                <View style={style.headerView}>

                    <View style={[{flex:1.5},style.viewIcon]}>
                        <Text style={style.text}>Hôm nay</Text>
                    </View>

                    <View style={{flex:2, flexDirection:'row'}}>
                            <View style={style.viewIcon}>
                                <Icon name="left" size={20} color="#900" onPress={()=>this.setMonth(1)}/>
                            </View>
                            <View style={style.viewIcon}>
                                <Text style={style.text}>Tháng {this.state.month} - {this.state.year}</Text>
                            </View>
                            <View style={style.viewIcon}>
                                <Icon name="right" size={20} color="#900" onPress={()=>this.setMonth(2)}/>
                            </View>
                    </View>

                    <View style={[{flex:1.5},style.viewIcon]}>
                        <Text style={style.text}>abc</Text>
                    </View>

                </View>
                <View style={{flexDirection:'row'}}>
                    {weak_day.map(e=><View style={style.weekday}>                               
                                         <Text style={[style.text,{fontWeight:"100"}]}>{e}</Text>
                                     </View>)}
                 </View>
                 <View style={{backgroundColor:'#FFFFFF'}}  {...this._panResponder.panHandlers}>
                    <FlatList
                    horizontal={false}
                    data={this.props.day}
                    numColumns ='7'
                    renderItem={({item}) =>{
                    return( 
                        <View style={[style.tableView,{backgroundColor:this.setDay_now(item)}]}>  
                            <TouchableOpacity onPress={()=>this.showInfo(item)}>
                                <View >
                                  {this.printCell(item)}                 
                                </View>
                            </TouchableOpacity>
                        </View>   
                        )}   
                    }></FlatList>
                </View>
            </View>
        )
    }
    setMonth(id){
        if(id==1){
            var _month = this.state.month -1 
            var _year = this.state.year
            if(_month==0){
                _month = 12
                _year = _year - 1
                
            }
            this.setState({month:_month,year:_year})          
            this.props.getMonths(_month,_year)
        
        }
        if(id==2)
        {
            console.log(id)
            var _month = this.state.month+1 
            var _year = this.state.year
            if(_month==13){
                _month = 1
                _year = _year + 1
                
            }
            this.setState({month:_month,year:_year})
            this.props.getMonths(_month,_year)

        }
    }
    
}