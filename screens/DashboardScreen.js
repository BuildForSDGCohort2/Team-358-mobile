import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
// import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
// import { AuthContext } from '../components/context';


const DashboardScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button title='Goto Usder Details' onPress={() => navigation.navigate('UserDetails')} />
            <StatusBar style="auto" />
        </View>
    );
};

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});