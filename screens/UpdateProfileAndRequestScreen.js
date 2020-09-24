import React from 'react';
import {
    StyleSheet,
    Text, View,
    Button, StatusBar,
    TouchableOpacity,
    ImageBackground,
    TextInput, AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

const RequestStationScreen = ({ navigation }) => {
    const { color } = useTheme();

    const [username, SetUsername] = React.useState('');

    React.useEffect(() => {
        const getNameAsyncStorage = async () => {
            const getName = await AsyncStorage.getItem('name');
            SetUsername(getName);
        };
        getNameAsyncStorage();

    }, [])

    return (
        <View style={styles.container}>
            <View style={{ margin: 20 }}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { }}>
                        <View style={{
                            height: 100,
                            width: 100,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <ImageBackground
                                source={{
                                    uri: 'https://api.adorable.io/avatars/51/abott@adorable.png',
                                }}
                                style={{ height: 100, width: 100 }}
                                imageStyle={{ borderRadius: 15 }}
                            >
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Icon name='camera-control' size={35} color='#fff' style={{
                                        opacity: 0.7,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        borderRadius: 10,
                                    }} />
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <Text style={{
                        marginTop: 10,
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}>{username}</Text>
                </View>
                <View style={styles.action}>
                    <FontAwesome name='user-o' color={color} size={20} />
                    <TextInput
                        placeholder='Full Name'
                        placeholderTextColor='#666'
                        style={[styles.textInput, { color: color }]}
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name='phone' color={color} size={20} />
                    <TextInput
                        placeholder='Phone Number'
                        placeholderTextColor='#666'
                        keyboardType='number-pad'
                        style={[styles.textInput, { color: color }]}
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.action}>
                    <Icon name='camera-outline' color={color} size={20} />
                    <TextInput
                        placeholder='Number of Stations'
                        placeholderTextColor='#666'
                        keyboardType='number-pad'
                        style={[styles.textInput, { color: color }]}
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name='globe' color={color} size={20} />
                    <TextInput
                        placeholder='State / City'
                        placeholderTextColor='#666'
                        style={[styles.textInput, { color: color }]}
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name='map-marker' color={color} size={20} />
                    <TextInput
                        placeholder='Address of Property'
                        placeholderTextColor='#666'
                        style={[styles.textInput, { color: color }]}
                        autoCorrect={false}
                    />
                </View>
                <TouchableOpacity style={styles.commandButton} onPress={() => { }}>
                    <Text style={styles.panelButtonTitle}>Submit</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
    );
};

export default RequestStationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#533164',
        alignItems: 'center',
        marginTop: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        //   marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
});