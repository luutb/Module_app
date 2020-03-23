import React,{ Component } from "react";
import {View,Text,ScrollView,Image,Dimensions} from 'react-native'
import CallApi from '../CallApi/ApiEnvironment'
import {
    LineChart 
  } from "react-native-chart-kit";

export default class CharPM10 extends Component{

    render(){
        return(
            <View>               
                <LineChart
                            data={{
                            labels: this.props.chart.data,
                            datasets: [
                                {
                                data:  this.props.chart.pm10s
                                }
                            ]
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height={220}  
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{                        
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                            }}
                            bezier
                            style={{
                            marginVertical: 8,
                            borderRadius: 16
                            }}
                        />
            </View>
        )
    }
}