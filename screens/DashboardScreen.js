import * as React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, Dimensions, TouchableOpacity } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';
import { FontAwesome, Feather } from '@expo/vector-icons';

import headerImage from './../assets/headerImage.jpg';
import { fetchVideoSream } from '../api/videoApi';

const MIN_HEIGHT = 55;
const MAX_HEIGHT = 222;

const DashboardScreen = (props) => {

    const navTitleView = React.useRef(null);

    const handleVideoStream = id => {
        // const response = fetchVideoSream(id);
        // const streamUrl = response.url;
        const streamUrl = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';
        props.navigation.navigate('VideoFrame', { url: streamUrl });
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' />
            <HeaderImageScrollView
                minHeight={MIN_HEIGHT}
                maxHeight={MAX_HEIGHT}
                maxOverlayOpacity={0.6}
                minOverlayOpacity={0.3}
                renderHeader={() => (
                    <Image source={headerImage} style={styles.image} />
                )}
                renderForeground={() => (
                    <View style={styles.titleContainer}>
                        <Text style={styles.imageTitle}>FASGD SURVEILLANCE</Text>
                    </View>
                )}
                renderFixedForeground={() => (
                    <Animatable.View style={styles.navTitleView} ref={navTitleView}>
                        <Text style={styles.navTitle}>FASGD SURVEILLANCE</Text>
                    </Animatable.View>
                )}
            >
                <TriggeringView style={styles.section}
                    onHide={() => navTitleView.current.fadeInUp(200)}
                    onDisplay={() => navTitleView.current.fadeOut(100)}
                >
                    <Text style={styles.title}>Overview</Text>
                </TriggeringView>
                <View style={[styles.section, styles.sectionLarge]}>
                    <Text style={styles.sectionContent}>
                        The Live video feed below captures frame from the camera,
                        perfoms a Facial Recognition, Gesture Recognition and takes in the users
                        Input Voice for verification. If the input data is matched with the data on its data base,
                        it Authenticates the user, and if NOT it sounds an alarm and sends the Frames of the
                        Unidentified person to the Original User.
                    </Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.cameras}>
                        <TouchableOpacity
                            onPress={handleVideoStream}
                            style={styles.cameraButton}>
                            <Text style={styles.buttonText}>Station Camera 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { }}
                            style={styles.cameraButton}>
                            <Text style={styles.buttonText}>Station Camera 2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { }}
                            style={styles.cameraButton}>
                            <Text style={styles.buttonText}>Add Station</Text>
                            <FontAwesome name='plus-circle' color='#fff' size={26}
                                style={{ alignSelf: 'center', marginLeft: 12 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </HeaderImageScrollView>
        </View>
    );
};

export default DashboardScreen;

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 222,
        width,
        alignSelf: 'stretch',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 30,
    },
    name: {
        fontWeight: 'bold',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    sectionContent: {
        fontSize: 20,
        textAlign: 'justify',
    },
    cameras: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    cameraButton: {
        flexDirection: 'row',
        backgroundColor: '#533164',
        borderRadius: 20,
        height: 130,
        margin: 10,
        padding: 10,
        paddingHorizontal: 15,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        alignSelf: 'center',
    },
    titleContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageTitle: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 24,
    },
    navTitleView: {
        height: MIN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        opacity: 0,
    },
    navTitle: {
        color: 'white',
        fontSize: 18,
        backgroundColor: 'transparent',
    },
    sectionLarge: {
        minHeight: 300,
    },
});