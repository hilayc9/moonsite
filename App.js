import React, {Component} from 'react';
import ReactNative, {Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";
import MovieList from './src/Screens/MovieList';
import MovieDetails from './src/Screens/MovieDetails';


export default class App extends Component {
    render() {
        ReactNative.I18nManager.allowRTL(false);
        return (
            <View style={{flex: 1}}>
                <AppContainer/>
                <View style={{ flexDirection: 'row', justifyContent: 'center', height: 30}}>
                    <Text style={{fontSize: 16, alignSelf: 'center'}}>Hilay Collignon</Text>
                </View>
            </View>
        )
    }
}

const AppNavigator = createStackNavigator(
    {
        Main: MovieList,
        Details: MovieDetails
    },
    {
        initialRouteName: 'Main'
    }
);

const AppContainer = createAppContainer(AppNavigator);