import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useContext} from 'react';
import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';
import {AuthProvider} from './src/context/AuthContext';
import {SectionProvider} from './src/context/SectionContext';

import Routes from './src/navigation/Routes';

const App = () => {
  return (
    <>
      <AuthProvider>
        <SectionProvider>
          <Routes />
        </SectionProvider>
      </AuthProvider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
