import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../components/context';


const UserDetailsScreen = ({ navigation }) => {

    const { signOut } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text>Details Screen</Text>
            <Button title='Goto Dashboard' onPress={() => navigation.navigate('Dashboard')} />
            <StatusBar style="auto" />
        </View>
    );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});