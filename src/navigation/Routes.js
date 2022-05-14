import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Navigation from './Navigation';
import AuthNavigation from './AuthNavigation';
import {AuthContext} from '../context/AuthContext';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    // console.log('logg in as:', user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <Navigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Routes;
