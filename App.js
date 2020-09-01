import 'react-native-gesture-handler';
import React, { useState, useEffect, useMemo } from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import RootStackScreen, { MainStackScreen } from './screens/RootStackScreen';
import { AuthContext } from './components/context';
import { loginUser, registerUser } from './api/userApi';


export default function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

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
      let userToken;
      userToken = null;
      const response = await loginUser(email, password)
      console.log('Response:', response)
      if (response.token) {
        userToken = null;
        try {
          userToken = response.token;
          await AsyncStorage.setItem('userToken', userToken);
        } catch (err) {
          console.log(err)
        }
      } else {
        Alert.alert('Invalid Credentials', response, [
          { text: 'Okay' }
        ]);
        return
      }
      dispatch({ type: 'LOGIN', id: email, token: userToken })
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (err) {
        console.log(err)
      }
      dispatch({ type: 'LOGOUT', })
    },
    signUp: async (name, email, password) => {
      // setUserToken('asdfg');
      // setIsLoading(false);
      let userToken;
      userToken = null;
      const response = await registerUser(name, email, password)
      console.log('Response:', response)
      if (response.token) {
        userToken = null;
        try {
          userToken = response.token;
          await AsyncStorage.setItem('userToken', userToken);
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
      dispatch({ type: 'LOGIN', id: email, token: userToken })
    },
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false)
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (err) {
        console.log(err)
      }
      console.log('User Token:', userToken);
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
