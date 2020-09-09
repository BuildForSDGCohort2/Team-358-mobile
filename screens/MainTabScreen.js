import * as React from 'react';
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from './DashboardScreen';
import UserDetailsScreen from './UserDetailsScreen';
import NotificationScreen from './NotificationScreen';
import VideoFrameScreen from './VideoFrameScreen';

const Tab = createMaterialBottomTabNavigator();
const DashboardStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const VideoFrameStack = createStackNavigator();

export const DashboardStackScreen = ({ navigation }) => {
    return (
        <DashboardStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#291832',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}>
            <DashboardStack.Screen name='Dashboard' component={DashboardScreen}
                options={{
                    title: 'Home',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Ionicons.Button name='ios-menu' size={26}
                            backgroundColor='transparent'
                            onPress={() => { navigation.openDrawer() }} />
                    )
                }} />
            <VideoFrameStack.Screen name='VideoFrame' component={VideoFrameScreen}
                options={{
                    title: 'Live Stream',
                    headerTitleAlign: 'center',
                }} />
        </DashboardStack.Navigator>
    )
}

export const DetailsStackScreen = ({ navigation }) => {
    return (
        <DetailsStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#291832',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}>
            <DetailsStack.Screen name='UserDetails' component={UserDetailsScreen}
                options={{
                    title: 'My Profile',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Ionicons.Button name='ios-menu' size={26}
                            backgroundColor='#291832'
                            onPress={() => { navigation.openDrawer() }} />
                    )
                }} />
        </DetailsStack.Navigator>
    )
}

export const NotificationStackScreen = ({ navigation }) => {
    return (
        <NotificationStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#291832',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}>
            <NotificationStack.Screen name='Notifications' component={NotificationScreen}
                options={{
                    title: 'Notifications',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Ionicons.Button name='ios-menu' size={26}
                            backgroundColor='#291832'
                            onPress={() => { navigation.openDrawer() }} />
                    )
                }} />
        </NotificationStack.Navigator>
    )
}

export default function MainTabScreen() {
    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            activeColor="#fff"
            shifting={true}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: '#291832',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="ios-home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationStackScreen}
                options={{
                    tabBarLabel: 'Alerts',
                    tabBarColor: '#291832',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="ios-notifications" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="UserDetails"
                component={DetailsStackScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarColor: '#291832',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="ios-person" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}