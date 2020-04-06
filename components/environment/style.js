import {StyleSheet} from 'react-native'

const style = StyleSheet.create({

    city:{
       fontSize:20,
       flex:1,
       fontWeight:'bold',
       textAlign:'center'
        
    },
    country:{
        flex:1,
        color:'#6c6c6c',
        textAlign:'center'
    },
    city_country:{
        flex:1,    
        height:50, 
       
       
    },
    view_infocity:{
        flex:1,    
        height:50,      
        backgroundColor:'#E56717'
    },
    view_aqius:{
        flex:1.5,
       
        alignContent:'center',
        flexDirection:'row',
        height:100,
        
        margin:5
    },
    view_aqius_img:{
        flex:1.5,
        width:'100%',
        height:'100%',
        justifyContent:'center'
    },
    view_aqius_aqius:{
        flex:1.5,
        height:100,
        textAlign:"center",
        color:"black",
        fontSize:30

    },
    aqius_note:{
        flex:0.5,
        color:"black",
        textAlign:"center",
        
        
    },
    view_aqius_note:{
        flex:2,
        justifyContent:"center"
    },
    view_weather:{
        flex:0.7,
        flexDirection:"row",
        backgroundColor:"#FFFFFF",
      
        margin:5
    },
    view_contetn:{
        flex:2,
        flexDirection:'row'
    },
    weather_img:{
     textAlign:'center',
     flex:0.7,
     height:40,
     width:20
    },
    content_weather:{
      textAlign: "center",
      justifyContent:'center',
      flex:1.3,

    },
    view_char:{
        flex:1,justifyContent:'center'

    },
    char_button:{
        textAlign:"center",
        fontSize:15
    },
    weather_text:{
        flex:1,paddingLeft:10,borderLeftWidth:1,borderLeftColor:'red',
        padding:10
    }
})

export default style;