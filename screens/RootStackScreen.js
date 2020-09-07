import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import SigninScreen from './SigninScreen';
import RegisterScreen from './RegisterScreen';
import SplashScreen from './SplashScreen';


const RootStack = createStackNavigator();

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