import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import JobsServices from '../services/JobsServices';
import ReviewsServices from '../services/ReviewsServices';

import {Card} from 'react-native-shadow-cards';
import {ScrollView} from 'react-native-gesture-handler';
import {AirbnbRating} from 'react-native-ratings';

export default class JobsScreen extends Component { //TODO Make it pretty
  constructor(props) {
    super(props);

    this.state = {
      jobsCards: []
    };
    this.serviceCallback = this.serviceCallback.bind(this);
    this.updateReview = this.updateReview.bind(this);
  }

  componentDidMount() {
    JobsServices.getAllJobs(this.serviceCallback);
  }

  updateReview(id, rating, message) {
    ReviewsServices.updateReview(
      id,
      {Rating: rating, Message: message},
      this.reviewUpdateCallBack,
    );
  }
  reviewUpdateCallBack(response) {
    if (response.status == 200) alert('Review Changed');
  }

  serviceCallback = response => {
    var jobsCards = [];
    let jobs = response.response;
    jobs.forEach(job => {
      var Review = <View></View>;
      if (job.job.State == 'Done') {
        var newRating = job.review.Rating;
        var newMessage = job.review.Message;
        Review = (
          <View>
            <AirbnbRating
              count={5}
              reviews={['Terrible', 'Bad', 'Meh', 'OK', 'Good']}
              defaultRating={job.review.Rating}
              size={20}
              onFinishRating={rating => {newRating = rating;}}
            />
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                multiline={true}
                numberOfLines={3}
                placeholderTextColor="black"
                placeholder={job.review.Message}
                onChangeText={descripton => {newMessage = descripton;}}
              />
            </View>
            <Button
              title="Update Review"
              color={'#303030'}
              onPress={() =>
                this.updateReview(job.review.Id, newRating, newMessage)
              }
            />
          </View>
        );
      }

      var Technician = <View></View>;
      if (job.job.State == 'Scheduled' || job.job.State == 'Done') {
        Technician = (
          <View>
            <Text>Technician Name: {job.technician.Name}</Text>
            <Text>Technician Number: {job.technician.PhoneNumber}</Text>
            <Text>Technician Rate: {job.technician.Rating}</Text>
          </View>
        );
      }
      jobsCards.push(
        <Card style={{padding: 10, margin: 10, backgroundColor: '#e6e6e6'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            Service Name:
            <Text style={{fontWeight: 'normal', fontSize: 15}}>
              {job.service.Name}
            </Text>
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            Job Description:
          </Text>
          <Text style={{fontWeight: 'normal', fontSize: 15}}>
            {job.job.Description}
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            Job Time:{' '}
            <Text style={{fontWeight: 'normal', fontSize: 15}}>
              {new Date(job.job.Time).toLocaleString()}
            </Text>
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
            {job.job.State}
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Your location:</Text>
          <Text style={{fontWeight: 'normal', fontSize: 15}}>
            {job.job.LocationDescription}
          </Text>
          {Technician}
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
