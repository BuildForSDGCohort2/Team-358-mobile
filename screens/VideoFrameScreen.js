import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('screen');

export default function VideoFrameScreen({ route }) {
    const { url } = route.params;
    return (
        <View style={styles.container}>
            <Video
                source={{ uri: url }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay={false}
                isLooping={false}
                useNativeControls
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
    },
    video: {
        width,
        height: height / 3,
    }
});