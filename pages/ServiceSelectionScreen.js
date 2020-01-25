import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
// import { Button } from 'react-native-elements';
import StorageHelper from '../helpers/StorageHelper';
import ServicesServices from '../services/ServicesServices';
import Bubble from '../components/Bubble';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import JobsServices from '../services/JobsServices';
import JobRequestsService from '../services/JobRequestsService';
export default class ServiceSelectionScreen extends Component {
  constructor(props) {
    super(props);
    let initialState = {
      locationName: '',
      services: [],
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      date: {},
      time: {},
      dateStr: 'mm/dd/yyyy',
      timeStr: 'hh:mm',
      descripton: '',
      serviceId: -1,
    };
    this.state = initialState;
    this.getLocationName = this.getLocationName.bind(this);
    this.servicesCallback = this.servicesCallback.bind(this);
    this.renderPickerOptions = this.renderPickerOptions.bind(this);
    this.postJob = this.postJob.bind(this);
    this.postJobCallback = this.postJobCallback.bind(this);
    this.postJobRequestCallback = this.postJobRequestCallback.bind(this);
  }

  componentDidMount() {
    this.getLocationName();
    ServicesServices.getAllServices(this.servicesCallback);
  }
  servicesCallback = Response => {
    let services = Response.response;
    this.setState({services});
  };
  async getLocationName() {
    let locationName = await StorageHelper.getLocationName();
    this.setState({locationName});
  }

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  showTimePicker = () => {
    this.setState({isTimePickerVisible: true});
  };

  hideTimePicker = () => {
    this.setState({isTimePickerVisible: false});
  };

  handleDateConfirm = date => {
    this.hideDatePicker();
    this.setState({date, dateStr: date.toLocaleDateString()});
    this.showTimePicker();
  };

  handleTimeConfirm = time => {
    this.hideTimePicker();
    this.setState({time, timeStr: time.toLocaleTimeString()});
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
  async postJob() {
    let Latitude = (await StorageHelper.getLocationArray())[0];
    let Longitude = (await StorageHelper.getLocationArray())[1];
    let ClientId = (await StorageHelper.getUser()).Id;
    let Description = this.state.descripton;
    let ServiceId = this.state.serviceId;
    let LocationDescription = this.state.locationName;
    let Time = new Date();
    Time.setDate(this.state.date);
    Time.setTime(this.state.time);
    let obj = {
      Latitude,
      Longitude,
      Time,
      ClientId,
      ServiceId,
      Description,
      LocationDescription,
    };
    JobsServices.postJob(obj, this.postJobCallback);
  }

  postJobCallback(response) {
    console.log(response);
    if (response.status == 201) {
      JobRequestsService.postJobRequest(
        response.response.Id,
        this.postJobRequestCallback,
      );
    } else {
      alert(JSON.stringify(response.response.ModelState.jobDTO[0]));
    }   
  }

  postJobRequestCallback(response) {
    console.log(response);
    if (response.status != 200) alert('Please try again later');
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <Bubble
          style={{
            bottom: 460,
            backgroundColor: '#fcfcfc',
            borderWidth: 0,
            marginBottom: 10,
          }}>
          <Text style={{paddingBottom: 20, fontWeight: 'bold', fontSize: 20}}>
            Your Selected Location
          </Text>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15}}>
            {this.state.locationName}
          </Text>
        </Bubble>

        <View style={{marginTop: 20}}>
          <Text
            style={{
              top: 30,
              fontWeight: 'bold',
              fontSize: 15,
              textAlign: 'center',
            }}>
            Select Your Service
          </Text>
          <View style={styles.pickerselect}>
            <RNPickerSelect
              onValueChange={serviceId => this.setState({serviceId})}
              useNativeAndroidPickerStyle={true}
              items={this.renderPickerOptions()}
              placeholder={{}}
              placeholderTextColor="black"
            />
          </View>
        </View>

        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={5}
            placeholder="Type Your Job Descripton"
            placeholderTextColor="grey"
            onChangeText={descripton => this.setState({descripton})}
          />
        </View>

        <Text
          style={{
            fontWeight: 'bold',
            marginBottom: 5,
            marginTop: 10,
            fontSize: 15,
          }}>
          Pick Your Time
        </Text>
        <View style={styles.container}>
          <Text
            style={{textAlign: 'center', fontSize: 15, color: 'white'}}
            onPress={this.showDatePicker}>
            {this.state.dateStr} {this.state.timeStr}
          </Text>
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            mode="date"
            onConfirm={this.handleDateConfirm}
            onCancel={this.hideDatePicker}
            minimumDate={new Date()}
          />
          <DateTimePickerModal
            isVisible={this.state.isTimePickerVisible}
            mode="time"
            onConfirm={this.handleTimeConfirm}
            onCancel={this.hideTimePicker}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={this.postJob} color="#303030" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fcfcfc',
  },
  pickerselect: {
    borderWidth: 1,
    borderColor: 'black',
    // borderRadius: 20,
    width: 200,
    marginTop: 35,
    marginBottom: 5,
  },
  container: {
    justifyContent: 'center',
    borderRadius: 1,
    backgroundColor: '#303030',
    width: '50%',
    borderWidth: 1,
    borderColor: '#fcfcfc',
    height: 30,
  },
  buttonContainer: {
    marginTop: 30,
    width: 150,
    top: 50,
    color: '#303030',
    backgroundColor: '#303030',
  },
  textAreaContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: 20,
  },
  textArea: {
    justifyContent: 'flex-start',
    textAlign: 'center',
    height: 150,
    borderWidth: 2,
    borderColor: '#9E9E9E',
    backgroundColor: '#FFFFFF',
  },
});
