import 'react-native-gesture-handler';
import React, { useEffect, useMemo } from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import RootStackScreen, { MainStackScreen } from './screens/RootStackScreen';
import { AuthContext } from './components/context';
import { loginUser, registerUser } from './api/userApi';


export default function App() {

  const initialLoginState = {
    isLoading: true,
    email: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          email: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

  const authContext = useMemo(() => ({
    signIn: async (email, password) => {
      // setUserToken('asdfg');
      // setIsLoading(false);
      const response = await loginUser(email, password)
      if (response.userToken) {
        let { userToken } = response;
        dispatch({ type: 'LOGIN', id: email, token: userToken })
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (err) {
          console.log(err)
        }
      } else {
        Alert.alert('Access Denied', response, [
          { text: 'Okay' }
        ]);
        return
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (err) {
        console.log(err)
      }
      dispatch({ type: 'LOGOUT', })
    },
    signUp: async (name, email, password) => {
      const response = await registerUser(name, email, password)
      if (response.data.userToken !== undefined && response.data.userToken !== null && response.data.userToken !== '') {
        let { userToken } = response.data;
        let { message } = response;
        try {
          await AsyncStorage.setItem('userToken', userToken);
          Alert.alert('Bravo!', message, [
            { text: 'Okay' }
          ]);
          dispatch({ type: 'REGISTER', id: email, token: userToken })
          return
        } catch (err) {
          console.log(err)
        }
      }
      else {
        Alert.alert('Error Occurred', response, [
          { text: 'Okay' }
        ]);
        return
      }
    },
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (err) {
        console.log(err)
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000)
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  };
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {
          loginState.userToken !== null ?
            <MainStackScreen /> :
            <RootStackScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
