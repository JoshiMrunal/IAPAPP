import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BuyProductComponent from './src/Functional components/BuyProductComponent';
import DashboardComponent from './src/Functional components/DashboardComponent';
import SubscribeProductComponent from './src/Functional components/SubscribeProductComponent';


const Stack = createStackNavigator();

export default class App extends React.Component {
  
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={DashboardComponent} />
          <Stack.Screen name="Buy Product" component={BuyProductComponent} />
          <Stack.Screen name="Subscribe Product" component={SubscribeProductComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});