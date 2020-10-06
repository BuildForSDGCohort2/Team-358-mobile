import { AsyncStorage } from "react-native";

const baseUrl = "https://team358.herokuapp.com";

// Fetch all videos available
export const fetchVideoStreams = async () => {
    const token = await AsyncStorage.getItem("userToken");
    try {
        const response = await fetch(`${baseUrl}/user/videos`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": token
            }
        })
        const { data } = await response.json();
        return data;
    } catch (err) {
        throw new Error(err);
    }
}
// Fetch video stream
export const fetchOneVideoClip = async (id) => {
    const token = await AsyncStorage.getItem("userToken");
    try {
        const response = await fetch(`${baseUrl}/user/video/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": token
            }
        })
        const { data } = await response.json()
        return data
    } catch (err) {
        throw new Error(err);
    }
}