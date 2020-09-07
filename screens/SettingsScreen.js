import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';

const SettingsScreen = (props) => {
    const [enableNonification, setEnableNotification] = React.useState(false);
    const [darkTheme, setDarkTheme] = React.useState(false);

    const toggleNotification = () => {
        setEnableNotification(!enableNonification);
        console.log('Enable notification:', enableNonification)
    }

    const toggleDarkTheme = () => {
        setDarkTheme(!darkTheme);
        console.log('Using dark theme:', darkTheme)
    }

    return (
        <View style={{ flex: 1 }}>
            <View>
                <View style={styles.settings}>
                    <Drawer.Section title='Preferences'>
                        <TouchableRipple onPress={() => { toggleNotification() }}>
                            <View style={styles.preference}>
                                <Text>Enable Notification</Text>
                                <View pointerEvents='none'>
                                    <Switch value={enableNonification} />
                                </View>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => { toggleDarkTheme() }}>
                            <View style={styles.preference}>
                                <Text>Use Dark Theme</Text>
                                <View pointerEvents='none'>
                                    <Switch value={darkTheme} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </View>
        </View>
    )
}

export default SettingsScreen;

const styles = StyleSheet.create({
    settings: {
        flex: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});