import * as React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, Dimensions, TouchableOpacity } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';
import { FontAwesome, Feather } from '@expo/vector-icons';

import headerImage from './../assets/headerImage.jpg';
import { fetchOneVideoClip, fetchVideoStreams } from '../api/videoApi';
import { ActivityIndicator } from 'react-native-paper';

const MIN_HEIGHT = 55;
const MAX_HEIGHT = 222;

const DashboardScreen = (props) => {

    const navTitleView = React.useRef(null);

    const [streams, setStreams] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        const getAllStreams = async () => {
            const response = await fetchVideoStreams();
            // console.log("Video streams:", response)
            setStreams(response);
            setIsLoading(false);
        }
        getAllStreams();
    }, [])

    const handleVideoStream = async (url) => {
        // const response = await fetchOneVideoClip(id);
        // console.log(response);
        // const response = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';
        props.navigation.navigate('VideoFrame', { url });
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#261228' barStyle='light-content' />
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
                <TriggeringView style={[styles.section, { borderBottomWidth: 1, borderBottomColor: '#ccc', }]}
                    onHide={() => navTitleView.current.fadeInUp(200)}
                    onDisplay={() => navTitleView.current.fadeOut(100)}
                >
                    <Text style={styles.title}>Available Stations</Text>
                </TriggeringView>
                <View style={styles.section}>
                    <View style={styles.cameras}>
                        {isLoading ? <View style={styles.container}>
                            <ActivityIndicator size='large' />
                        </View> :
                            streams.map((stream, num) =>
                                <TouchableOpacity key={stream._id}
                                    onPress={() => handleVideoStream(stream.url)}
                                    style={styles.cameraButton}>
                                    <Text style={styles.buttonText}>Frame {num + 1}</Text>
                                </TouchableOpacity>
                            )}

                        <TouchableOpacity
                            onPress={() => { props.navigation.navigate('RequestUpdate') }}
                            style={styles.cameraButton}>
                            <Text style={styles.buttonText}>Add Station</Text>
                            <FontAwesome name='plus-circle' color='#fff' size={26}
                                style={{ alignSelf: 'center', marginLeft: 8 }}
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
        alignItems: 'center',
        padding: 20,

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
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#533164',
        borderRadius: 20,
        height: 60,
        width: width / 3,
        margin: 12,
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