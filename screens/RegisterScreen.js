import React, { useState } from "react";
import { Alert, StyleSheet, Text, View, Button, Dimensions, StatusBar } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import { AuthContext } from "../components/context";
const { height, width } = Dimensions.get("screen");

const RegisterScreen = ({ navigation }) => {
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        check_nameInputChange: false,
        check_emailInputChange: false,
        secureTextEntry: true,
        secureConfirmTextEntry: true,
        isValidName: true,
        isValidEmail: true,
        isValidPassword: true,
        isValidPasswordMatch: true,
    });

    const { signUp } = React.useContext(AuthContext);

    const emailInputChange = val => {
        if (/^[\S]+\.?[\d]?@{1}[\w]+\.\w{2,}$/gi.test(val)) {
            setData({
                ...data,
                email: val,
                check_emailInputChange: true,
                isValidEmail: true,
            })
        } else {
            setData({
                ...data,
                email: val,
                check_emailInputChange: false,
                isValidEmail: false,
            })
        }
    };

    const handleNameInputChange = val => {
        if (val.split(" ")[1]) {
            setData({
                ...data,
                name: val,
                check_nameInputChange: true,
                isValidName: true,
            })
        } else {
            setData({
                ...data,
                name: val,
                check_nameInputChange: false,
                isValidName: false
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
    const handleConfirmPasswordChange = val => {
        if (val === data.password) {
            setData({
                ...data,
                confirmPassword: val,
                isValidPasswordMatch: true,
            });
        } else {
            setData({
                ...data,
                confirmPassword: val,
                isValidPasswordMatch: false,
            })
        }
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

    const handleSignUp = (name, email, password) => {
        if (name && email && password) {
            if (name.split(" ")[1]) {
                if (password === data.confirmPassword) {
                    signUp(name, email, password);
                } else {
                    Alert.alert("Password mismatch", "Please check that you have matched your password", [
                        { text: "Okay" }
                    ]);
                }
                return
            } else {
                Alert.alert("Invalid Name", "Please input your full name!", [
                    { text: "Okay" }
                ]);
            }
            return
        }
        Alert.alert("Invalid Fields", "Fields can't be empty", [
            { text: "Okay" }
        ]);
        return
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#261228" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}>
                <Text style={styles.text_footer}>Full Name</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user" color="#05375a" size={20} />
                    <TextInput
                        placeholder="Enter Your Full Name"
                        style={styles.textInput}
                        onChangeText={(val) => handleNameInputChange(val)}
                    />
                    {data.check_nameInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null
                    }
                </View>

                {data.isValidName ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Please Enter Fullname</Text>
                    </Animatable.View>
                }

                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="envelope" color="#05375a" size={20} />
                    <TextInput
                        placeholder="Enter Your Email Address"
                        style={styles.textInput}
                        onChangeText={(val) => emailInputChange(val)}
                        onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
                        autoCapitalize="none"
                    />
                    {data.check_emailInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null
                    }
                </View>

                {data.isValidEmail ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Use a valid email</Text>
                    </Animatable.View>
                }

                <Text style={[styles.text_footer, {
                    marginTop: 35,
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock" color="#05375a" size={20} />
                    <TextInput
                        placeholder="Set Password"
                        style={styles.textInput}
                        secureTextEntry={data.secureTextEntry}
                        onChangeText={(val) => handlePasswordChange(val)}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            /> :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>

                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Must be at least 6 characters</Text>
                    </Animatable.View>
                }

                <Text style={[styles.text_footer, {
                    marginTop: 35,
                }]}>Confirm Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock" color="#05375a" size={20} />
                    <TextInput
                        placeholder="Confirm Your Password"
                        style={styles.textInput}
                        secureTextEntry={data.secureConfirmTextEntry}
                        onChangeText={(val) => handleConfirmPasswordChange(val)}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        onPress={updateConfirmSecureTextEntry}
                    >
                        {data.secureConfirmTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            /> :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>

                {data.isValidPasswordMatch ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Must match your chosen password</Text>
                    </Animatable.View>
                }

                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => { handleSignUp(data.name, data.email, data.password) }}>
                        <LinearGradient
                            colors={["#482b57", "#1f1225"]}
                            style={[styles.signIn, { width: width * 0.90 }]}
                        >
                            <Text style={[styles.textSign, { color: "#fff" }]}>Register</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Signin")}
                        style={[styles.signIn, {
                            borderColor: "#291832",
                            borderWidth: 1,
                            marginTop: 15,
                            width: width * 0.90,
                        }]}
                    >
                        <Text style={[styles.textSign, { color: "#291832" }]}>Go-to Sign In</Text>
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
        backgroundColor: "#291832",
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 6,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 30
    },
    text_footer: {
        color: "#05375a",
        fontSize: 18
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5
    },
    actionError: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#FF0000",
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: -12,
        paddingLeft: 10,
        color: "#05375a",
    },
    errorMsg: {
        color: "#FF0000",
        fontSize: 14,
    },
    button: {
        alignItems: "center",
        marginTop: 50
    },
    signIn: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold"
    }
});