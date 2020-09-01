import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import SigninScreen from './SigninScreen';
import RegisterScreen from './RegisterScreen';
import SplashScreen from './SplashScreen';
import DashboardScreen from './DashboardScreen';


const RootStack = createStackNavigator();

const MainStack = createStackNavigator();

export const MainStackScreen = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name='Dashboard' component={DashboardScreen}
                options={{ title: 'My Dashboard', headerTitleAlign: 'center' }} />
        </MainStack.Navigator>
    )
}

const RootStackScreen = () => {
    return (
        <RootStack.Navigator headerMode='none'>
            <RootStack.Screen name='Splash' component={SplashScreen} />
            <RootStack.Screen name='Signin' component={SigninScreen}
                options={{ title: 'Signin', headerTitleAlign: 'center' }} />
            <RootStack.Screen name='Register' component={RegisterScreen}
                options={{ title: 'User Registration', headerTitleAlign: 'center' }} />
        </RootStack.Navigator>
    )
}

export default RootStackScreen;