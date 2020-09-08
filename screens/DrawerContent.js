import * as React from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons'

import MainTabScreen from './MainTabScreen';
import SettingsScreen from './SettingsScreen';
import { AuthContext } from '../components/context';

const DrawerBar = createDrawerNavigator();
const SettingStack = createStackNavigator()

const DrawerBarContent = (props) => {

    const { signOut } = React.useContext(AuthContext);

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://api.adorable.io/avatars/51/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>Firstname Lastname</Title>
                                <Caption style={styles.caption}>Welcome back</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name='home-outline' color={color} size={size} />
                            )}
                            label='Home'
                            onPress={() => { props.navigation.navigate('Dashboard') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name='settings-outline' color={color} size={size} />
                            )}
                            label='Settings'
                            onPress={() => { props.navigation.navigate('Settings') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name='camera-plus-outline' color={color} size={size} />
                            )}
                            label='Request'
                            onPress={() => { }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name='information-outline' color={color} size={size} />
                            )}
                            label='App Info'
                            onPress={() => { }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon name='exit-to-app' color={color} size={size} />
                    )}
                    label='Sign Out'
                    onPress={() => { signOut() }}
                />
            </Drawer.Section>
        </View>
    )
}

const SettingsStackScreen = ({ navigation }) => {
    return (
        <SettingStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#291832',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}>
            <SettingStack.Screen name='Settings' component={SettingsScreen}
                options={{
                    title: 'Settings',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Icon.Button name='arrow-left' size={26}
                            backgroundColor='transparent'
                            onPress={() => { navigation.goBack() }} />
                    )
                }}
            />
        </SettingStack.Navigator>
    )
}

export default function DrawerNavigator() {
    return (
        <DrawerBar.Navigator drawerContent={props => <DrawerBarContent {...props} />}>
            <DrawerBar.Screen name="Home" component={MainTabScreen} />
            <DrawerBar.Screen name="Settings" component={SettingsStackScreen} />
        </DrawerBar.Navigator>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
});