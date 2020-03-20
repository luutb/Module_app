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
                         <Button title="CurrencyView" onPress={ () => this.onSubmit(1)}/>
                    </View>
                    <View style={styles.button}>
                         <Button title="EnvironmentView" onPress={ () => this.onSubmit(2)}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="JourneysView" onPress={ () => this.onSubmit(3)}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="CalendarView" onPress={ () => this.onSubmit(4)}/>
                    </View>
                    
                    
                </View>
            </View>
        )
    }
    onSubmit(id){
        this.props.onClick(id);
    }
}

const styles = StyleSheet.create({
    button: {
        marginBottom:20,
        backgroundColor:'red'
    }
});