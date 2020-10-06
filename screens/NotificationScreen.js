import React from "react";
import { Text, View, StyleSheet, StatusBar, TouchableOpacity } from "react-native";

const NotificationScreen = () => {

    return (
        <View
            style={styles.mainContainer}>
            <StatusBar style="auto" />
            <TouchableOpacity style={styles.notificationsContainer}>
                <Text style={styles.title}>New Notification sample </Text>
                <Text>Notification sample body</Text>
                <Text>Notification sample data</Text>
            </TouchableOpacity>
            <View style={styles.notificationsDiv} />
        </View>
    );
}

export default NotificationScreen;

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: "space-around",
    },
    notificationsContainer: {
        justifyContent: "flex-start",
        marginHorizontal: 20,
        marginVertical: 5,
    },
    title: {
        fontFamily: "sans-serif",
        fontSize: 20,
        color: "#307ecc"
    },
    notificationsDiv: {
        height: 1,
        marginLeft: 2,
        backgroundColor: "#aaa",
        marginTop: 2,
        marginBottom: 2,
    },
});
