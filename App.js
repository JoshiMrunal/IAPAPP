import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import BuyProductComponent from './src/Functional components/BuyProductComponent';
import DashboardComponent from './src/Functional components/DashboardComponent';
import SubscribeProductComponent from './src/Functional components/SubscribeProductComponent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createBottomTabNavigator();

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Dashboard" component={DashboardComponent} /> */}
         
          <Stack.Screen name="subscription Product" component={SubscribeProductComponent}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Image
                  source={
                    focused
                      ? require('../IAPAPP/src/images/sub.png')
                      : require('../IAPAPP/src/images/sub.png')
                  }
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    tintColor: focused ? '#1273de' : 'black'
                  }}
                />
              ),
            }}
          />
           <Stack.Screen name="Buy Product"
            component={BuyProductComponent}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Image
                  source={
                    focused
                      ? require('../IAPAPP/src/images/home.png')
                      : require('../IAPAPP/src/images/home.png')
                  }
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    tintColor: focused ? '#1273de' : 'black'
                  }}
                />
              ),
            }}
          />
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