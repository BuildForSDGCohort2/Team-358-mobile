import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Dimensions, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const SplashScreen = ({ navigation }) => {

    return (
        <View style={styles.container} >
            <StatusBar backgroundColor="#261228" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.project}>FASGD-III</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}>
                <Text style={styles.title}>Watch over your own property from anywhere!</Text>
                <Text style={styles.text}>Sign in with account</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                        <LinearGradient
                            colors={["#482b57", "#1f1225"]}
                            style={styles.signin}
                        >
                            <Text style={styles.textsign}>Get Started  </Text>
                            <Ionicons name="ios-arrow-forward" color="#fff" size={20} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View >
    )
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#291832",
    },
    header: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    logo: {
        width: height_logo,
        height: height_logo,
    },
    title: {
        color: "#05375a",
        fontSize: 30,
        fontWeight: "bold",
    },
    text: {
        color: "grey",
        marginTop: 5,
    },
    button: {
        alignItems: "flex-end",
        marginTop: 30
    },
    signin: {
        width: 150,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        flexDirection: "row",
    },
    textsign: {
        color: "#fff",
        fontWeight: "bold",
    },
    project: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 50,
    }
});