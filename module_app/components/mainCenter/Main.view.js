import React,{Component} from 'react';
import {View,Text, Button, StyleSheet} from 'react-native';
import Header from '../header/Header.view';


export default class MainView extends Component
{
    render(){
        return(
            <View>
               <Header/>

                <View>
                    <View style={styles.button}>
                         <TouchableOpacity title="CurrencyView" onPress={ () =>this.clickButton(1)}/>
                    </View>
                    <View style={styles.button}>
                         <TouchableOpacity title="EnvironmentView" onPress={ () =>this.clickButton(2)}/>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity title="JourneysView" onPress={ () =>this.clickButton(3)}/>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity title="CalendarView" onPress={ () =>this.clickButton(4)}/>
                    </View>
                </View>
            </View>
        )
    }
clickButton(id){

this.props.TranferView(id);
}
}

const styles = StyleSheet.create({
    button: {
        marginBottom:20,
        backgroundColor:'red'
    }
});
