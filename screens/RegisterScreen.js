import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, Dimensions, StatusBar } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { AuthContext } from '../components/context';
const { height, width } = Dimensions.get('screen');

const RegisterScreen = ({ navigation }) => {
    const [data, setData] = useState({
        email: '',
        password: '',
        fullName: '',
        confirmPassword: '',
        check_nameInputChange: false,
        check_emailInputChange: false,
        secureTextEntry: true,
        secureConfirmTextEntry: true,
    });
    const emailInputChange = val => {
        if (val.length !== 0) {
            setData({
                ...data,
                email: val,
                check_emailInputChange: true,
            })
        } else {
            setData({
                ...data,
                email: val,
                check_emailInputChange: false,
            })
        }
    };

    const handleNameInputChange = val => {
        if (val.length !== 0) {
            setData({
                ...data,
                name: val,
                check_nameInputChange: true,
            })
        } else {
            setData({
                ...data,
                name: val,
                check_nameInputChange: false,
            })
        }
    };

    const handlePasswordChange = val => {
        setData({
            ...data,
            password: val,
        });
    };
    const handleConfirmPasswordChange = val => {
        setData({
            ...data,
            confirmPassword: val,
        });
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        })
    };
    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            secureConfirmTextEntry: !data.secureConfirmTextEntry,
        })
    };

    const { signUp } = React.useContext(AuthContext);

    const handleSignUp = (name, email, password) => {
        if (email && password) {
            signUp(name, email, password);
            return
        }
        Alert.alert('Invalid Fields', 'Fields can\'t be empty', [
            { text: 'Okay' }
        ]);
        return
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#533164' barStyle='light-content' />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register</Text>
            </View>
            <Animatable.View
                animation='fadeInUpBig'
                style={styles.footer}>
                <Text style={styles.text_footer}>Full Name</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name='user' color='#05375a' size={20} />
                    <TextInput
                        placeholder='Full Name'
                        style={styles.textInput}
                        onChangeText={val => handleNameInputChange(val)}
                    />
                    {data.check_nameInputChange ?
                        <Animatable.View
                            animation='bounceIn'
                        >
                            <Feather
                                name='check-circle'
                                color='green'
                                size={20}
                            />
                        </Animatable.View>
                        : null
                    }
                </View>

                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name='user' color='#05375a' size={20} />
                    <TextInput
                        placeholder='Email Address'
                        style={styles.textInput}
                        onChangeText={val => emailInputChange(val)}
                        autoCapitalize='none'
                    />
                    {data.check_emailInputChange ?
                        <Animatable.View
                            animation='bounceIn'
                        >
                            <Feather
                                name='check-circle'
                                color='green'
                                size={20}
                            />
                        </Animatable.View>
                        : null
                    }
                </View>

                <Text style={[styles.text_footer, {
                    marginTop: 35,
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name='lock' color='#05375a' size={20} />
                    <TextInput
                        placeholder='Password'
                        style={styles.textInput}
                        secureTextEntry={data.secureTextEntry}
                        onChangeText={val => handlePasswordChange(val)}
                        autoCapitalize='none'
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name='eye-off'
                                color='grey'
                                size={20}
                            /> :
                            <Feather
                                name='eye'
                                color='grey'
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>

                <Text style={[styles.text_footer, {
                    marginTop: 35,
                }]}>Confirm Password</Text>
                <View style={styles.action}>
                    <Feather
                        name='lock' color='#05375a' size={20} />
                    <TextInput
                        placeholder='Confirm Password'
                        style={styles.textInput}
                        secureTextEntry={data.secureConfirmTextEntry}
                        onChangeText={val => handleConfirmPasswordChange(val)}
                        autoCapitalize='none'
                    />
                    <TouchableOpacity
                        onPress={updateConfirmSecureTextEntry}
                    >
                        {data.secureConfirmTextEntry ?
                            <Feather
                                name='eye-off'
                                color='grey'
                                size={20}
                            /> :
                            <Feather
                                name='eye'
                                color='grey'
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => { handleSignUp(data.fullName, data.email, data.password) }}>
                        <LinearGradient
                            colors={['#482b57', '#1f1225']}
                            style={[styles.signIn, { width: width * 0.90 }]}
                        >
                            <Text style={[styles.textSign, { color: '#fff' }]}>Register</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Signin')}
                        style={[styles.signIn, {
                            borderColor: '#291832',
                            borderWidth: 1,
                            marginTop: 15,
                            width: width * 0.90,
                        }]}
                    >
                        <Text style={[styles.textSign, { color: '#291832' }]}>Go-to Sign In</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#291832',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 6,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});