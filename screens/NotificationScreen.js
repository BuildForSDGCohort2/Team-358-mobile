import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';


const NotificationScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>Notifications Screen</Text>
            <Button title='Goto Dashboard' onPress={() => navigation.navigate('Dashboard')} />
            <StatusBar style="auto" />
        </View>
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});