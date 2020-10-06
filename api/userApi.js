import { AsyncStorage } from "react-native";
const baseUrl = "https://team358.herokuapp.com/";

// Register User
export const registerUser = async (name, email, password) => {
    try {
        const response = await fetch(`${baseUrl}user/register`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
            const results = await response.json();
            return results;
        } else {
            const { message } = await response.json();
            return message;
        }
    } catch (err) {
        throw new Error(err);
    }
}

// Login User
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${baseUrl}user/login`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const { data } = await response.json();
            return data;
        } else {
            const { message } = await response.json();
            return message;
        }
    } catch (err) {
        throw new Error(err);
    }
}

// Update User
export const requestUpdate = async (name, phone, stations, city, country) => {
    try {
        const response = await fetch(`${baseUrl}user/update`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ name, phone, stations, city, country })
        });

        if (response.ok) {
            const results = await response.json();
            return results;
        } else {
            const { message } = await response.json();
            return message;
        }
    } catch (err) {
        throw new Error(err);
    }
}

export const fetchSavePushToken = async (pushToken) => {
    const token = await AsyncStorage.getItem("userToken");
    const id = await AsyncStorage.getItem("userid");
    try {
        const response = await fetch(`${baseUrl}user/saveToken`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                id: id,
                token: pushToken
            })
        });
        if (response.ok) {
            const { message } = await response.json();
            return message;
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log("Error occured:", error);
    }
}