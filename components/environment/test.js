import React,{ Component } from "react";
import {View,StyleSheet,Text,TouchableOpacity,Modal,Button} from "react-native"
import MapboxGL from '@react-native-mapbox-gl/maps';

const ACCESS_TOKEN = 'pk.eyJ1IjoibHV1dGIwNjAzIiwiYSI6ImNrODVueGk1cTA4dmMzZGp4NDE5bXh3djcifQ.3_p8MVUCQHRkrueMJ5G2KA'

MapboxGL.setAccessToken(ACCESS_TOKEN);
const AnnotationContent = ({title,onPress,backgroundColor}) => (
    <View style={{  width: 60}}>
     
      <TouchableOpacity
          onPress = {onPress}
          style={{
          backgroundColor:backgroundColor,
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
export default class Test extends Component{

    constructor(props){
        super(props)
        this.points = [
          {
            coordinate: [105.827115, 20.984130],
            onPress : ()=>{
              this.setState({isVisible:true})
            },
            title:"10",
            backgroundColor:"red"
          },
          {
            coordinate: [106.928115, 20.984130],
            onPress : ()=>{
              alert("hello 2")
            },
            title:"20",
            backgroundColor:"blue"
          }
        ]
        this.state= {  
          isVisible: false,
           }

    }
render(){
    return(

      <View style={{flex:1}}>
        <Modal
              animationType='slide'
              visible={this.state.isVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={styles.modal}>
                <TouchableOpacity onPress={()=>this.setState({isVisible:false})}>
                    <Text>abcd</Text>
                </TouchableOpacity>
              </View>
        </Modal>
      
        <View style={styles.map}>
          <MapboxGL.MapView
            ref={c => (this._map = c)}
            onPress={this.onPress}
            onDidFinishLoadingMap={this.onDidFinishLoadingMap}
            style={{flex:1}}>
            <MapboxGL.Camera
              zoomLevel={5}
              centerCoordinate={ [105.827115, 20.984130]}
            />
            {
              this.points.map(m=> <MapboxGL.MarkerView coordinate={m.coordinate}>
                <AnnotationContent 
                  title = {m.title}
                  backgroundColor={m.backgroundColor}
                  onPress = {()=>m.onPress()}  />
              </MapboxGL.MarkerView> )
            }
          
            </MapboxGL.MapView>
          </View>  
        </View>
        )
    }
}


var styles = StyleSheet.create({  
    container: {
     alignItems:'center',
      flex: 1
    },
    map: {
      flex:1,
    },
    text: {
      padding: 20
    },
   
    modal: {
     
      backgroundColor: '#FFFFFF',
      elevation: 10,
      justifyContent:'center',
      flexDirection:'row-reverse',
      height:100,
      alignItems: 'center',
  

    },
    view: {
      justifyContent: 'flex-end',
      margin: 0,
    },
  });
  