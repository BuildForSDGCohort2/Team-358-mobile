import "react-native-gesture-handler";
import React, { useEffect, useMemo } from "react";
import { Alert, AsyncStorage, StyleSheet, Text, View, Button, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "./screens/RootStackScreen";
import { AuthContext } from "./components/context";
import { loginUser, registerUser } from "./api/userApi";
import DrawerNavigator from "./screens/DrawerContent";
import { loginReducer } from "./reducers/userReducer";


export default function App() {

  const initialLoginState = {
    isLoading: true,
    email: null,
    userToken: null,
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async (email, password) => {
      const response = await loginUser(email, password);
      if (response.userToken) {
        let { userToken } = response;
        try {
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("name", response.name);
          await AsyncStorage.setItem("email", response.email);
          await AsyncStorage.setItem("userid", response._id);
        } catch (err) {
          console.log(err)
        }
        dispatch({ type: "LOGIN", id: email, token: userToken })
      } else {
        Alert.alert("Access Denied", response, [
          { text: "Okay" }
        ]);
        return
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.clear();
      } catch (err) {
        console.log(err)
      }
      dispatch({ type: "LOGOUT", })
    },
    signUp: async (name, email, password) => {
      const response = await registerUser(name, email, password)
      if (response.data.userToken !== undefined && response.data.userToken !== null && response.data.userToken !== "") {
        let { userToken } = response.data;
        let { message } = response;
        try {
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("name", response.data.name);
          await AsyncStorage.setItem("userid", response.data._id);
          await AsyncStorage.setItem("email", response.data.email);
          Alert.alert("Bravo!", message, [
            { text: "Okay" }
          ]);
          dispatch({ type: "REGISTER", id: email, token: userToken })
          return
        } catch (err) {
          console.log(err)
        }
      }
      else {
        Alert.alert("Error Occurred", response, [
          { text: "Okay" }
        ]);
        return
      }
    },
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (err) {
        console.log(err)
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000)
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  };
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {
          loginState.userToken !== null ?
            <DrawerNavigator /> :
            <RootStackScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
