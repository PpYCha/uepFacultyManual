import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddManualScreen from '../screens/AddManualScreen';
import SectionScreen from '../screens/SectionScreen';
import SectionListScreen from '../screens/SectionListScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="SignInScreen">
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
