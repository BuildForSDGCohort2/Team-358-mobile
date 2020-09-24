import React from 'react';
import { StyleSheet, View, Button, StatusBar, AsyncStorage } from 'react-native';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../components/context';


const UserDetailsScreen = ({ navigation }) => {

    const [username, SetUsername] = React.useState('');
    const [email, setEmail] = React.useState('');

    React.useEffect(() => {
        const getNameAsyncStorage = async () => {
            const getName = await AsyncStorage.getItem('name');
            const getEmail = await AsyncStorage.getItem('email');
            SetUsername(getName);
            setEmail(getEmail);
        };
        getNameAsyncStorage();

    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={{
                            uri: 'https://api.adorable.io/avatars/51/abott@adorable.png'
                        }}
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{username}</Title>
                        <Caption style={styles.caption}>{email}</Caption>
                    </View>
                </View>
            </View>
            <StatusBar style="auto" />
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name='map-marker-radius' size={20} color='#777' />
                    <Text style={{ color: '#777', marginLeft: 20 }}>Lagos, Nigeria</Text>
                </View>
                <View style={styles.row}>
                    <Icon name='phone' size={20} color='#777' />
                    <Text style={{ color: '#777', marginLeft: 20 }}>010574568</Text>
                </View>
                <View style={styles.row}>
                    <Icon name='email' size={20} color='#777' />
                    <Text style={{ color: '#777', marginLeft: 20 }}>{email}</Text>
                </View>
            </View>

            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, { borderRightColor: '#ddd', borderRightWidth: 1 }]}>
                    <Text>3</Text>
                    <Caption>Stations</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Text>2</Text>
                    <Caption>Active</Caption>
                </View>
            </View>

            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name='star-outline' color='#ff6347' size={25} />
                        <Text style={styles.menuItemText}>Rate this app</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name='share-outline' color='#ff6347' size={25} />
                        <Text style={styles.menuItemText}>Share this app</Text>
                    </View>
                </TouchableRipple>
            </View>

            <TouchableRipple onPress={() => { }}>
                <View style={styles.menuItem}>
                    <Icon name='account-check-outline' color='#ff6347' size={25} />
                    <Text style={styles.menuItemText}>Support</Text>
                </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => { }}>
                <View style={styles.menuItem}>
                    <Icon name='settings-outline' color='#ff6347' size={25} />
                    <Text style={styles.menuItemText}>Settings</Text>
                </View>
            </TouchableRipple>
        </View>
    );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});