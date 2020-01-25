import React, {Fragment} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {Button} from 'react-native-elements';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import ErrorMessage from '../components/ErrorMessage';
import ServicesServices from '../services/ServicesServices';
import TechniciansServices from '../services/TechniciansServices';
import RNPickerSelect from 'react-native-picker-select';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Must have at least 2 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(4, 'Password must have more than 4 characters '),
  phoneNumber: Yup.string()
    .label('phoneNumber')
    //.typeError("That doesn't look like a phone number")
    //.positive("A phone number can't start with a minus")
    //.integer("A phone number can't include a decimal point")
    //.min(8)
    .required('A phone number is required'),
});

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      ServiceId:-1
    };

    this.servicesCallback = this.servicesCallback.bind(this);
    this.renderPickerOptions = this.renderPickerOptions.bind(this);
  }
  goToLogin = () => this.props.navigation.navigate('Login');

  handleClientPost = response => {
    if (response.status == 201) {
      this.goToLogin();
    } else {
      alert(response.response.ModelState.clientDTO[0]);
    }
  };

  renderPickerOptions() {
    let options = [];
    let services = this.state.services;
    services.forEach(service => {
      options.push({
        label: service.Name,
        value: service.Id,
      });
    });
    return options;
  }
  componentDidMount() {
    ServicesServices.getAllServices(this.servicesCallback);
  }
  servicesCallback = Response => {
    let services = Response.response;
    console.log(Response);
    this.setState({services});
  };

  handleSubmit = values => {
    if (values.email.length > 0 && values.password.length > 0) {
      let data = {
        Name: values.name,
        Email: values.email,
        Password: values.password,
        PhoneNumber: values.phoneNumber,
        ServiceId:this.state.ServiceId
      };
      TechniciansServices.postTechnician(data, this.handleClientPost);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            phoneNumber: '',
          }}
          onSubmit={values => {
            this.handleSubmit(values);
          }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting,
          }) => (
            <Fragment>
              <FormInput
                name="name"
                value={values.name}
                onChangeText={handleChange('name')}
                placeholder="Enter your full name"
                iconName="md-person"
                iconColor="#2C384A"
                onBlur={handleBlur('name')}
                autoFocus
              />
              <ErrorMessage errorValue={touched.name && errors.name} />
              <FormInput
                name="email"
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="Enter email"
                autoCapitalize="none"
                iconName="ios-mail"
                iconColor="#2C384A"
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <FormInput
                name="password"
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Enter password"
                secureTextEntry
                iconName="ios-lock"
                iconColor="#2C384A"
                onBlur={handleBlur('password')}
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <FormInput
                name="phoneNumber"
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                placeholder="phoneNumber"
                iconName="ios-lock"
                iconColor="#2C384A"
                onBlur={handleBlur('phoneNumber')}
              />
              <ErrorMessage
                errorValue={touched.phoneNumber && errors.phoneNumber}
              />
              <View style={styles.pickerselect}>
                <RNPickerSelect
                  onValueChange={ServiceId => this.setState({ServiceId})}
                  useNativeAndroidPickerStyle={true}
                  items={this.renderPickerOptions()}
                  placeholder={{}}
                  placeholderTextColor="black"
                />
              </View>
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="SIGNUP"
                  buttonColor="#039BE5"
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
            </Fragment>
          )}
        </Formik>
        <Button
          title="Have an account? Login"
          onPress={this.goToLogin}
          titleStyle={{
            color: '#039BE5',
          }}
          type="clear"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  pickerselect: {
    borderWidth: 1,
    borderColor: 'black',
    width: 200,
    marginTop: 35,
    marginBottom: 5,
    marginLeft:25
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    margin: 25,
  },
});
