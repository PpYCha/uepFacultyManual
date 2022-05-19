import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const SearchScreen = ({navigation}) => {
  const [found, setFound] = useState();
  const [search, setSearch] = useState('');

  const searchKeyword = async () => {
    const list = [];
    await firestore()
      .collection('mainSection')
      // Filter results
      // .where('sectionTitle', '==', 'ACADEMIC')
      .orderBy('sectionTitle')
      .startAt(search)
      .endAt(search + '\uf8ff')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const subsectionId = doc.id;
          const {sectionNumber, sectionTitle} = doc.data();
          list.push({
            subsectionId,
            sectionNumber,
            sectionTitle,
          });
          console.log(doc.id, ' => ', doc.data());
        });
      });
    setFound(list);
    console.log('line 17:', found);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        // onPress={() => {
        //   navigation.navigate('AddManualScreen', {
        //     sectionNumber: sectionNumber,
        //     subsectionId: item.subsectionId,
        //     title: item.title,
        //     content: item.content,
        //   });
        // }}
      >
        <Text style={styles.title}>{item.sectionTitle}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerLeft}>
        <Ionicons.Button
          name="search-outline"
          size={30}
          backgroundColor="#fff"
          color="#2e64e5"
          onPress={searchKeyword}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={search}
          onChangeText={text => setSearch(text)}
        />
      </View>
      <FlatList
        data={found}
        renderItem={renderItem}
        keyExtractor={item => item.subsectionId}
        // extraData={selectedId}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383838',
    color: 'black',
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F1F6FE',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    textAlignVertical: 'top',
    color: 'black',
  },
  searchIcon: {
    backgroundColor: '#F1F6FE',
    color: 'black',
  },
  input: {
    flex: 1,
    paddingTop: 10,

    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#F1F6FE',
    color: '#424242',
  },
  item: {
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    color: 'black',
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
  },
});
