import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Video } from 'expo-av';
// import VideoPlayer from 'expo-video-player'
// import * as ScreenOrientation from 'expo-screen-orientation';


const { width, height } = Dimensions.get('screen');

export default function VideoFrameScreen({ route }) {

    // const changeScreenOrientation = async () => {
    //     await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    // }

    const { url } = route.params;
    return (
        <View style={styles.container}>
            <Video
                source={{ uri: url }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode={Video.RESIZE_MODE_CONTAIN}
                shouldPlay={false}
                isLooping={false}
                useNativeControls={true}
                // switchToLandscape={changeScreenOrientation}
                style={styles.video}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    video: {
        width,
        height: height / 3,
    }
});