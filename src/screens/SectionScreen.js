import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';


const SectionScreen = ({navigation}) => {
  const [section, setSection] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  return (
    <ScrollView>
      <View>
        <CustomInput
          textName="Section"
          onChangeText={text => setSection(text)}
        />
        <CustomInput textName="Title" onChangeText={text => setTitle(text)} />
        <CustomInput
          typeOfInput="multiline"
          numberOfLines={10}
          textName="Content"
          onChangeText={text => setContent(text)}
        />
        <CustomButton textName="Save" onPress={() => {}} />
      </View>
    </ScrollView>
  );
};

export default SectionScreen;

const styles = StyleSheet.create({
  continer: {
    backgroundColor: '#F1F6FE',
    flex: 1,
    padding: 10,
  },
});
