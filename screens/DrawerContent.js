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

import MainTabScreen from './MainTabScreen';
import SettingsScreen from './SettingsScreen';
import { AuthContext } from '../components/context';
import RequestStationScreen from './UpdateProfileAndRequestScreen';
// import VideoFrameScreen from './VideoFrameScreen';

const DrawerBar = createDrawerNavigator();
const SettingStack = createStackNavigator();
const RequestUpdateStack = createStackNavigator();
const VideoFrameStack = createStackNavigator();

const DrawerBarContent = (props) => {
    const [username, SetUsername] = React.useState('')

    React.useEffect(() => {
        const getNameAsyncStorage = async () => {
            const getName = await AsyncStorage.getItem('name');
            SetUsername(getName);
        };
        getNameAsyncStorage();

    }, [])

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
                                <Title style={styles.title}>{username}</Title>
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
                            onPress={() => { props.navigation.navigate('RequestUpdate') }}
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
                    onPress={async () => { await signOut() }}
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

// const VideoStackScreen = ({ navigation }) => {
//     return (
//         <VideoFrameStack.Navigator screenOptions={{
//             headerStyle: {
//                 backgroundColor: '#291832',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//                 fontWeight: 'bold',
//             }
//         }}>
//             <VideoFrameStack.Screen name='RequestUpdate' component={VideoFrameScreen}
//                 options={{
//                     title: 'Live Stream Video',
//                     headerTitleAlign: 'center',
//                     headerLeft: () => (
//                         <Icon.Button name='arrow-left' size={26}
//                             backgroundColor='transparent'
//                             onPress={() => { navigation.goBack() }} />
//                     )
//                 }}
//             />
//         </VideoFrameStack.Navigator>
//     )
// }

const RequestUpdateStackScreen = ({ navigation }) => {
    return (
        <RequestUpdateStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#291832',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}>
            <RequestUpdateStack.Screen name='RequestUpdate' component={RequestStationScreen}
                options={{
                    title: 'Add Station',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Icon.Button name='arrow-left' size={26}
                            backgroundColor='transparent'
                            onPress={() => { navigation.goBack() }} />
                    )
                }}
            />
        </RequestUpdateStack.Navigator>
    )
}

export default function DrawerNavigator() {
    return (
        <DrawerBar.Navigator drawerContent={props => <DrawerBarContent {...props} />}>
            <DrawerBar.Screen name="Home" component={MainTabScreen} />
            <SettingStack.Screen name="Settings" component={SettingsStackScreen} />
            <RequestUpdateStack.Screen name="RequestUpdate" component={RequestUpdateStackScreen} />
            {/* <VideoFrameStack.Screen name='VideoFrame' component={VideoStackScreen} /> */}
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