import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import JobsServices from '../../services/JobsServices';
import JobRequestsServices from '../../services/JobRequestsService';

import {Card} from 'react-native-shadow-cards';
import {ScrollView} from 'react-native-gesture-handler';
import {AirbnbRating} from 'react-native-ratings';
import StorageHelper from '../../helpers/StorageHelper';

let init = {
  jobsCards: [],
  TechnicianId: -1,
  message: '',
};
export default class JobsScreen extends Component {
  //TODO Make it pretty
  constructor(props) {
    super(props);

    this.state = init;
    this.serviceCallback = this.serviceCallback.bind(this);
    this.callback = this.callback.bind(this);
    this.initializeComp = this.initializeComp.bind(this);
  }

  async componentDidMount() {
    await this.initializeComp();
  }

  async initializeComp(){
    this.setState(init);
    this.setState({TechnicianId: (await StorageHelper.getUser()).Id});
    JobsServices.getAllJobs(true, this.serviceCallback);
  }

  acceptRequest(requestId) {
    var body = {
      TechnicianId: this.state.TechnicianId,
      State: 1,
    };
    JobRequestsServices.patchJobRequest(requestId, body, this.callback);
  }

  rejectRequest(requestId) {
    var body = {
      TechnicianId: this.state.TechnicianId,
      State: 2,
    };
    JobRequestsServices.patchJobRequest(requestId, body, this.callback);
  }

  callback(response) {
    if (response.status == 200) {
      this.props.navigation.navigate('Home');
    }
  }
  serviceCallback = response => {
    var jobsCards = [];
    let jobs = response.response;
    if (jobs.length == 0) {
      this.state.message = 'No Pending Jobs';
    }
    jobs.forEach(job => {
      jobsCards.push(
        <Card style={{padding: 10, margin: 10, backgroundColor: '#e6e6e6'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            Job Description:
          </Text>
          <Text style={{fontWeight: 'normal', fontSize: 15}}>
            {job.Description}
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            Job Time:{' '}
            <Text style={{fontWeight: 'normal', fontSize: 15}}>
              {new Date(job.Time).toLocaleString()}
            </Text>
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>location:</Text>
          <Text style={{fontWeight: 'normal', fontSize: 15}}>
            {job.LocationDescription}
          </Text>
          <View style={{padding: 5}}>
            <Button
              color="#36ba4e"
              title="Accept"
              onPress={() => this.acceptRequest(job.RequestId)}
            />
          </View>
          <View style={{padding: 5}}>
            <Button
              color="red"
              title="Ignore"
              onPress={() => this.rejectRequest(job.RequestId)}
            />
          </View>
        </Card>,
      );
    });
    this.setState({jobsCards});
  };

  render() {
    return (
      <ScrollView style={{marginHorizontal: 20}}>
        <View style={styles.container}>{this.state.jobsCards}</View>
        <Text style={{textAlign: 'center', paddingTop: 200,fontSize:20}}>
          {this.state.message}
        </Text>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: 5,
    margin: 5,
    borderWidth: 2,
    borderColor: '#9E9E9E',
    backgroundColor: '#FFFFFF',
  },
});
