import { AsyncStorage } from "react-native"

const baseUrl = 'https://team358.herokuapp.com/';

// Fetch video stream
export const fetchVideoSream = async (id) => {
    const token = await AsyncStorage.getItem('userToken')
    try {
        const response = await fetch(baseUrl, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                // "Authorization": token
            }
        })
        const { data } = await response.json()
        console.log('Dataa:', data);
        return data
    } catch (err) {
        throw new Error(err);
    }
}