import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import React from 'react';

const CustomButton = ({onPress, textName, backgroundColor, ...rest}) => {
  return (
    <>
      <TouchableOpacity
        style={[styles.container, {backgroundColor: backgroundColor}]}
        onPress={onPress}>
        <Text style={styles.text}>{textName}</Text>
      </TouchableOpacity>
    </>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    margin: 10,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
