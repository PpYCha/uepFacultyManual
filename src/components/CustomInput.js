import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomInput = ({
  iconName,
  textName,
  value,
  onChangeText,
  secureTextEntry,
  typeOfInput,
  editable,

  ...rest
}) => {
  return (
    <>
      {typeOfInput === 'multiline' ? (
        <View style={styles.container}>
          <Text style={styles.header}>{textName}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <View>
              <Ionicons name={iconName} size={14} style={styles.icon} />
            </View>
            <View style={{flex: 1}}>
              <TextInput
                value={value}
                secureTextEntry={secureTextEntry}
                multiline
                numberOfLines={10}
                onChangeText={onChangeText}
                style={{textAlignVertical: 'top', textAlign: 'justify'}}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>{textName}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <View>
              <Ionicons name={iconName} size={14} style={styles.icon} />
            </View>
            <View style={{flex: 1}}>
              <TextInput
                value={value}
                editable={editable}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    margin: 10,
    padding: 10,
  },
  header: {},
  input: {},
  icon: {marginTop: 17, marginRight: 5},
});
