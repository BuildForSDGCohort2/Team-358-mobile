import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, StatusBar, Dimensions } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { AuthContext } from '../components/context';


const { height, width } = Dimensions.get('screen');

const SigninScreen = ({ navigation }) => {
    const [data, setData] = useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidEmail: true,
        isValidPassword: true,
    });

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = val => {
        if (/^[\S]+\.?[\d]?@{1}[\w]+\.\w{2,}$/gi.test(val)) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidEmail: true,
            })
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidEmail: false,
            })
        }
    };
    const handlePasswordChange = val => {
        if (val.trim().length >= 6) {
            setData({
                ...data,
                password: val,
                isValidPassword: true,
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false,
            })
        }
    };
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        })
    };

    const handleLogin = (email, password) => {
        if (email && password) {
            signIn(email, password)
            return
        }
        Alert.alert('Invalid Fields', 'Fields can\'t be empty', [
            { text: 'Okay' }
        ]);
        return
    };

    const handleValidEmail = val => {
        if (/^[\S]+\.?[\d]?@{1}[\w]+\.\w{2,}$/gi.test(val)) {
            setData({
                ...data,
                isValidEmail: true,
            })
        } else {
            setData({
                ...data,
                isValidEmail: false,
            })
        }
    };

    const handleValidPassword = val => {
        if (val.trim().length >= 6) {
            setData({
                ...data,
                isValidPassword: true,
            })
        } else {
            setData({
                ...data,
                isValidPassword: false,
            })
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#533164' barStyle='light-content' />
            <View style={styles.header}>
                <Text style={styles.text_header}>Sign In</Text>
            </View>
            <Animatable.View
                animation='fadeInUpBig'
                style={styles.footer}>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name='envelope' color='#05375a' size={20} />
                    <TextInput
                        placeholder='Your Email Address'
                        style={styles.textInput}
                        onChangeText={val => textInputChange(val)}
                        onEndEditing={e => handleValidEmail(e.nativeEvent.text)}
                        autoCapitalize='none'
                    />
                    {data.check_textInputChange ?
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
                {data.isValidEmail ? null :
                    <Animatable.View animation='fadeInLeft' duration={500}>
                        <Text style={styles.errorMsg}>Invalid email</Text>
                    </Animatable.View>
                }

                <Text style={[styles.text_footer, {
                    marginTop: 35,
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name='lock' color='#05375a' size={20} />
                    <TextInput
                        placeholder='Your Password'
                        style={styles.textInput}
                        secureTextEntry={data.secureTextEntry}
                        onChangeText={val => handlePasswordChange(val)}
                        onEndEditing={e => handleValidPassword(e.nativeEvent.text)}
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

                {data.isValidPassword ? null :
                    <Animatable.View animation='fadeInLeft' duration={500}>
                        <Text style={styles.errorMsg}>Invalid password</Text>
                    </Animatable.View>
                }

                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { handleLogin(data.email, data.password) }}>
                        <LinearGradient
                            colors={['#482b57', '#1f1225']}
                            style={[styles.signIn, { width: width * 0.90 }]}
                        >
                            <Text style={[styles.textSign, { color: '#fff' }]}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                        style={[styles.signIn, {
                            borderColor: '#291832',
                            borderWidth: 1,
                            marginTop: 15,
                            width: width * 0.90,
                        }]}
                    >
                        <Text style={[styles.textSign, { color: '#291832' }]}>Register</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
}

export default SigninScreen;

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
        flex: 3,
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