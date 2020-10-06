import React from "react";
import {
    StyleSheet,
    Text, View,
    Button, StatusBar,
    TouchableOpacity,
    ImageBackground,
    TextInput, AsyncStorage,
    Platform, Alert
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const RequestStationScreen = ({ navigation }) => {
    const { color } = useTheme();

    const [username, SetUsername] = React.useState("");
    const [data, setData] = React.useState({
        name: "",
        phone: "",
        stations: "",
        address: "",
        state: "",
    });

    React.useEffect(() => {
        const getNameAsyncStorage = async () => {
            const getName = await AsyncStorage.getItem("name");
            SetUsername(getName);
        };
        getNameAsyncStorage();

    }, []);

    const handleSubmit = () => {
        if (data.address != "" && data.state != "") {
            Alert.alert("Success", "Details submitted", [
                { text: "OKAY" }
            ]);
        } else {
            Alert.alert("Failed", "Please specify details properly", [
                { text: "OKAY" }
            ]);
        }
    };

    const handleNameChange = (val) => {
        setData({
            ...data,
            name: val,
        })
    };
    const handlePhoneChange = (val) => {
        setData({
            ...data,
            phone: val,
        })
    };
    const handleStationChange = (val) => {
        setData({
            ...data,
            stations: val,
        })
    };
    const handleAddressChange = (val) => {
        setData({
            ...data,
            address: val,
        })
    };
    const handleStateChange = (val) => {
        setData({
            ...data,
            state: val,
        })
    };

    return (
        <View style={styles.container}>
            <View style={{ margin: 20 }}>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity onPress={() => { }}>
                        <View style={{
                            height: 100,
                            width: 100,
                            borderRadius: 15,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <ImageBackground
                                source={{
                                    uri: "https://p.kindpng.com/picc/s/78-785827_user-profile-avatar-login-account-male-user-icon.png",
                                }}
                                style={{ height: 100, width: 100 }}
                                imageStyle={{ borderRadius: 15 }}
                            >
                                <View style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                    <Icon name="camera-control" size={35} color="#fff" style={{
                                        opacity: 0.7,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderWidth: 1,
                                        borderColor: "#fff",
                                        borderRadius: 10,
                                    }} />
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <Text style={{
                        marginTop: 10,
                        fontSize: 18,
                        fontWeight: "bold",
                    }}>{username}</Text>
                </View>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={color} size={20} />
                    <TextInput
                        placeholder="Full Name"
                        placeholderTextColor="#666"
                        onChangeText={(val) => handleNameChange(val)}
                        style={[styles.textInput, { color: color }]}
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="phone" color={color} size={20} />
                    <TextInput
                        placeholder="Phone Number"
                        placeholderTextColor="#666"
                        keyboardType="number-pad"
                        onChangeText={(val) => handlePhoneChange(val)}
                        style={[styles.textInput, { color: color }]}
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.action}>
                    <Icon name="camera-outline" color={color} size={20} />
                    <TextInput
                        placeholder="Number of Stations"
                        placeholderTextColor="#666"
                        keyboardType="number-pad"
                        onChangeText={(val) => handleStationChange(val)}
                        style={[styles.textInput, { color: color }]}
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="map-marker" color={color} size={20} />
                    <TextInput
                        placeholder="Address of Property"
                        placeholderTextColor="#666"
                        onChangeText={val => handleAddressChange(val)}
                        style={[styles.textInput, { color: color }]}
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="globe" color={color} size={20} />
                    <TextInput
                        placeholder="State"
                        placeholderTextColor="#666"
                        onChangeText={(val) => handleStateChange(val)}
                        style={[styles.textInput, { color: color }]}
                        autoCorrect={false}
                    />
                </View>
                <TouchableOpacity style={styles.commandButton} onPress={handleSubmit}>
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
        backgroundColor: "#533164",
        alignItems: "center",
        marginTop: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#FF0000",
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : -12,
        paddingLeft: 10,
        color: "#05375a",
    },
});