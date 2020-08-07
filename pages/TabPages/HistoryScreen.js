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

import {Card} from 'react-native-shadow-cards';
import {ScrollView} from 'react-native-gesture-handler';
import {AirbnbRating} from 'react-native-ratings';

let init = {
  jobsCards: [],
};
export default class HistoryScreen extends Component {
  constructor(props) {
    super(props);

    this.state = init;
    this.serviceCallback = this.serviceCallback.bind(this);
    this.iniitializeComponent = this.iniitializeComponent.bind(this);
  }

  componentDidMount() {
    this.iniitializeComponent();
  }

  iniitializeComponent() {
    this.setState(init);
    JobsServices.getAllJobs(false, this.serviceCallback);
  }

  serviceCallback = response => {
    var jobsCards = [];
    let jobs = response.response;
    jobs.forEach(job => {
      var Review = <View></View>;
      if (job.State == 'Done') {
        Review = (
          <View>
            <AirbnbRating
              count={5}
              reviews={['Terrible', 'Bad', 'Meh', 'OK', 'Good']}
              defaultRating={job.review.Rating}
              size={20}
              isDisabled={true}
            />
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                multiline={true}
                numberOfLines={3}
                placeholderTextColor="black"
                value={job.review.Message}
                editable={false}
              />
            </View>
          </View>
        );
      }

      var client = <View></View>;
      if (job.RequestState == 'Accepted') {
        client = (
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Client Name:{' '}
              <Text style={{fontWeight: 'normal', fontSize: 16}}>
                {' '}
                {job.client.Name}{' '}
              </Text>
            </Text>

            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Client Number:{' '}
              <Text style={{fontWeight: 'normal', fontSize: 16}}>
                {' '}
                {job.client.PhoneNumber}
              </Text>
            </Text>
          </View>
        );
      }
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
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            Job Request Status:
          </Text>
          <Text
            style={{
              border: 1,
              borderRadius: 5,
              borderWidth: 1,
              fontSize: 15,
              padding: 5,
            }}>
            {job.RequestState}
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Job Status:</Text>
          <Text
            style={{
              border: 1,
              borderRadius: 5,
              borderWidth: 1,
              fontSize: 15,
              padding: 5,
            }}>
            {job.State}
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>location:</Text>
          <Text style={{fontWeight: 'normal', fontSize: 16}}>
            {job.LocationDescription}
          </Text>
          {client}
          {Review}
        </Card>,
      );
    });
    this.setState({jobsCards});
  };

  render() {
    return (
      <ScrollView style={{marginHorizontal: 20}}>
        <View style={styles.container}>{this.state.jobsCards}</View>
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
