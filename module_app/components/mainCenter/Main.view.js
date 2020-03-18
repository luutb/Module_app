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
                         <Button title="CurrencyView" onPress={ () => {}}/>
                    </View>
                    <View style={styles.button}>
                         <Button title="EnvironmentView" onPress={ () => {}}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="JourneysView" onPress={ () => {}}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="CalendarView" onPress={ () => {}}/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        marginBottom:20,
        backgroundColor:'red'
    }
});