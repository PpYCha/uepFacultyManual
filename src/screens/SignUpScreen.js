import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Button,
} from 'react-native';
import React, {useState, useContext} from 'react';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {AuthContext} from '../context/AuthContext';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import data from '../model/data';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState();
  const [typeofUser, setTypeofUser] = useState('user');
  const [contactNumber, setContactNumber] = useState();
  const [birthDate, setBirthDate] = useState();
  const [course, setCourse] = useState();
  const {register} = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [openPicker, setOpenPicker] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'COLLEGE OF LAW', value: 'COLLEGE OF LAW'},
    {label: 'COLLEGE OF AGRICULTURE', value: 'COLLEGE OF AGRICULTURE'},
    {
      label: 'COLLEGE OF ARTS IN COMMUNICATION',
      value: 'COLLEGE OF ARTS IN COMMUNICATION',
    },
    {label: 'COLLEGE OF EDUCATION', value: 'COLLEGE OF EDUCATION'},
    {label: 'COLLEGE OF ENGINEERING', value: 'COLLEGE OF ENGINEERING'},
    {label: 'COLLEGE OF NURSING', value: 'COLLEGE OF NURSING'},
    {label: 'COLLEGE OF SCIENCE', value: 'COLLEGE OF SCIENCE'},
    {
      label: 'COLLEGE OF VETERINARY MEDICINE',
      value: 'COLLEGE OF VETERINARY MEDICINE',
    },

    {
      label: 'Bachelor of Laws',
      value: 'Bachelor of Laws',
      parent: 'COLLEGE OF LAW',
    },
    //Agriculture
    {
      label: 'BS in Agriculture ',
      value: 'BS in Agriculture ',
      parent: 'COLLEGE OF AGRICULTURE',
    },

    {
      label: 'BS in Agricultural Extension',
      value: 'BS in Agricultural Extension',
      parent: 'COLLEGE OF AGRICULTURE',
    },
    {
      label: 'BS in Agricultural Engineering (Water Resources)',
      value: 'BS in Agricultural Engineering (Water Resources)',
      parent: 'COLLEGE OF AGRICULTURE',
    },
    {
      label: 'BS in Agricultural Technology',
      value: 'BS in Agricultural Technology',
      parent: 'COLLEGE OF AGRICULTURE',
    },
    {
      label: "BS in Agricultural Eng'g Technology ",
      value: "BS in Agricultural Eng'g Technology ",
      parent: 'COLLEGE OF AGRICULTURE',
    },
    {
      label: 'BS in Fisheries',
      value: 'BS in Fisheries',
      parent: 'COLLEGE OF AGRICULTURE',
    },
    {
      label: 'BS in Agribusiness',
      value: 'BS in Agribusiness',
      parent: 'COLLEGE OF AGRICULTURE',
    },
    {
      label: 'BS in Forestry',
      value: 'BS in Forestry',
      parent: 'COLLEGE OF AGRICULTURE',
    },
    {
      label: 'BS in Agricultural Education',
      value: 'BS in Agricultural Education',
      parent: 'COLLEGE OF AGRICULTURE',
    },
    //College of Arts in Communication

    {
      label: 'Literature and Language Teaching',
      value: 'Literature and Language Teaching',
      parent: 'COLLEGE OF ARTS IN COMMUNICATION',
    },
    {
      label: 'Political SciencePolitical Science',
      value: 'Political SciencePolitical Science',
      parent: 'COLLEGE OF ARTS IN COMMUNICATION',
    },
    {
      label: 'Political Science',
      value: 'Political Science',
      parent: 'COLLEGE OF ARTS IN COMMUNICATION',
    },
    {
      label: 'Sociology',
      value: 'Sociology',
      parent: 'COLLEGE OF ARTS IN COMMUNICATION',
    },
    {
      label: 'Bachelor of Arts in Broadcast Communication',
      value: 'Bachelor of Arts in Broadcast Communication',
      parent: 'COLLEGE OF ARTS IN COMMUNICATION',
    },
    {
      label: 'Bachelor of Arts in Journalism',
      value: 'Bachelor of Arts in Journalism',
      parent: 'COLLEGE OF ARTS IN COMMUNICATION',
    },
    {
      label: 'Bachelor of Science in Development Communication',
      value: 'Bachelor of Science in Development Communication',
      parent: 'COLLEGE OF ARTS IN COMMUNICATION',
    },
    {
      label: 'Bachelor of Science in Community Development',
      value: 'Bachelor of Science in Community Development',
      parent: 'COLLEGE OF ARTS IN COMMUNICATION',
    },
    {
      label: 'Bachelor of Science in Criminology',
      value: 'Bachelor of Science in Criminology',
      parent: 'COLLEGE OF ARTS IN COMMUNICATION',
    },
    {
      label: 'Associate in Arts',
      value: 'Associate in Arts',
      parent: 'COLLEGE OF ARTS IN COMMUNICATION',
    },
    //College of Education
    {
      label: 'Bachelor of Elementary Education',
      value: 'Bachelor of Elementary Education',
      parent: 'COLLEGE OF EDUCATION',
    },
    {
      label: 'Bachelor of Secondary Education',
      value: 'Bachelor of Secondary Education',
      parent: 'COLLEGE OF EDUCATION',
    },
    {
      label: 'BEEd-Home Economics',
      value: 'BEEd-Home Economics',
      parent: 'COLLEGE OF EDUCATION',
    },
    {
      label: 'BS in Home Economics',
      value: 'BS in Home Economics',
      parent: 'COLLEGE OF EDUCATION',
    },
    {
      label: 'BS in Industrial Education',
      value: 'BS in Industrial Education',
      parent: 'COLLEGE OF EDUCATION',
    },
    {
      label: 'Bachelor of Technician Teacher Education',
      value: 'Bachelor of Technician Teacher Education',
      parent: 'COLLEGE OF EDUCATION',
    },
    {
      label: 'BS in Hotel and Restaurant Management',
      value: 'BS in Hotel and Restaurant Management',
      parent: 'COLLEGE OF EDUCATION',
    },
    // COLLEGE OF ENGINEERING
    {
      label: 'BS in Civil Engineering',
      value: 'BS in Civil Engineering',
      parent: 'COLLEGE OF ENGINEERING',
    },
    {
      label: 'BS in Electrical Engineering',
      value: 'BS in Electrical Engineering',
      parent: 'COLLEGE OF ENGINEERING',
    },
    {
      label: 'BS in Mechanical Engineering',
      value: 'BS in Mechanical Engineering',
      parent: 'COLLEGE OF ENGINEERING',
    },
    {
      label: 'BS in Computer Technology',
      value: 'BS in Computer Technology',
      parent: 'COLLEGE OF ENGINEERING',
    },
    {
      label:
        'Bachelor of Technology major in: Architectural Drafting Technology',
      value:
        'Bachelor of Technology major in: Architectural Drafting Technology',
      parent: 'COLLEGE OF ENGINEERING',
    },
    {
      label: 'Bachelor of Technology major in: Auto Technology',
      value: 'Bachelor of Technology major in: Auto Technology',
      parent: 'COLLEGE OF ENGINEERING',
    },
    {
      label: 'Bachelor of Technology major in: Civil Technology',
      value: 'Bachelor of Technology major in: Civil Technology',
      parent: 'COLLEGE OF ENGINEERING',
    },
    {
      label: 'Bachelor of Technology major in: Electrical Technology',
      value: 'Bachelor of Technology major in: Electrical Technology',
      parent: 'COLLEGE OF ENGINEERING',
    },
    // Nursing
    {
      label: 'BS in Nursing',
      value: 'BS in Nursing',
      parent: 'COLLEGE OF NURSING',
    },
    // COLLEGE OF SCIENCE
    {
      label: 'BS in Biology',
      value: 'BS in Biology',
      parent: 'COLLEGE OF SCIENCE',
    },
    {
      label: 'BS in Environmental Science',
      value: 'BS in Environmental Science',
      parent: 'COLLEGE OF SCIENCE',
    },
    {
      label: 'BS in Chemistry',
      value: 'BS in Chemistry',
      parent: 'COLLEGE OF SCIENCE',
    },
    {
      label: 'BS in Information Technology',
      value: 'BS in Information Technology',
      parent: 'COLLEGE OF SCIENCE',
    },
    {
      label: 'BS in Marine Biology',
      value: 'BS in Marine Biology',
      parent: 'COLLEGE OF SCIENCE',
    },

    // COLLEGE OF VETERINARY MEDICINE
    {
      label: 'Doctor of Veterinary Medicine',
      value: 'Doctor of Veterinary Medicine',
      parent: 'COLLEGE OF VETERINARY MEDICINE',
    },
    {
      label: 'BS in Meat Technology',
      value: 'BS in Meat Technology',
      parent: 'COLLEGE OF VETERINARY MEDICINE',
    },
  ]);

  const handleLogin = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.headerText}>Creating Account</Text>
        </View>
        <CustomInput
          iconName="mail-outline"
          textName="Email Address"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <CustomInput
          iconName="ios-lock-closed-outline"
          textName="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <CustomInput
          iconName="person-outline"
          textName="Fullname"
          value={fullName}
          onChangeText={text => setFullName(text)}
        />
        <CustomInput
          iconName="phone-portrait-outline"
          textName="Contact #"
          value={contactNumber}
          onChangeText={text => setContactNumber(text)}
        />

        {/* <DatePicker mode="date" date={date} onDateChange={setDate} /> */}

        <CustomButton
          textName="Select Birthdate"
          backgroundColor="gray"
          onPress={() => setOpen(true)}
        />
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <DropDownPicker
          listMode="MODAL"
          open={openPicker}
          value={value}
          items={items}
          setOpen={setOpenPicker}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select Department"
        />

        <CustomButton
          textName="Sign Up"
          backgroundColor="#3E4684"
          onPress={() => {
            if (email != '' || password != '') {
              register(
                email,
                password,
                typeofUser,
                fullName,
                contactNumber,
                date,
                value,
              );
            } else {
              Alert.alert('Please input your password or email');
            }
          }}
        />
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignInScreen');
            }}>
            <Text>Already have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F6FE',
    flex: 1,
    padding: 10,

    // justifyContent: 'center',
  },
  top: {
    padding: 10,
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
  },
  bottom: {
    padding: 10,
  },
});
