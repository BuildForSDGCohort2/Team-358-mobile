import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Switch, Text, TextInput, TouchableRipple } from "react-native-paper";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { fetchSavePushToken } from "../api/userApi";


const SettingsScreen = ({ navigation }) => {

    // const [enableNonification, setEnableNotification] = useState(false);
    // const [pushToken, setPushToken] = useState(")
    // const [darkTheme, setDarkTheme] = useState(false);
    const [useToken, setUseToken] = useState("");

    const toggleNotification = async () => {
        await registerForPushNotificationsAsync();
        // setEnableNotification(!enableNonification);
    };

    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                Alert.alert("Token Failed", "Failed to get push token for push notification!", [
                    { text: "Ok" }
                ]);
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            Alert.alert("No Device found", "Must use physical device for Push Notifications", [
                { text: "Ok" }
            ]);
        }

        const response = await fetchSavePushToken(token);
        if (response) {
            Alert.alert("Subscription status", response, [
                { text: "Okay" }
            ]);
        }

        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }

        return token;
    }

    // const toggleDarkTheme = () => {
    //     setDarkTheme(!darkTheme);
    //     console.log("Using dark theme:", darkTheme)
    // }

    const sendNotification = async (expoPushToken) => {
        const message = {
            to: expoPushToken,
            sound: "default",
            title: "Unknown Face Detected",
            body: "FASGD-III has detected an unknown face at...",
            data: { data: "data goes here" },
        };

        await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Accept-encoding": "gzip, deflate",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        });
    };

    const tokenChange = (val) => {
        setUseToken(val)
    }
    return (
        <View style={styles.container}>

            <TouchableRipple onPress={toggleNotification}>
                <View style={styles.preference}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Enable Push Notification</Text>
                    <View pointerEvents="none">
                        {/* <Switch value={enableNonification} /> */}
                    </View>
                </View>
            </TouchableRipple>

            {/* <TouchableRipple onPress={() => { toggleDarkTheme() }}>
                <View style={styles.preference}>
                    <Text>Use Dark Theme</Text>
                    <View pointerEvents="none">
                        <Switch value={darkTheme} />
                    </View>
                </View>
            </TouchableRipple> */}

            <TouchableOpacity onPress={() => sendNotification(useToken)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Send Notification</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter target device's pushToken"
                    style={styles.textInput}
                    onChangeText={val => tokenChange(val)}
                    autoCapitalize="none"
                />
            </View>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preference: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 4,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#ccc",
    },
    button: {
        backgroundColor: "#291832",
        padding: 10,
        paddingHorizontal: 40,
        marginVertical: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
    },
    textInput: {
        flex: 1,
        marginTop: -12,
        paddingLeft: 10,
        color: "#05375a",
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});