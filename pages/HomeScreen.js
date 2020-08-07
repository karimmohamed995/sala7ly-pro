import React from 'react';
import {StyleSheet, View, Button, PermissionsAndroid} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import StorageHelper from '../helpers/StorageHelper';
import {Text} from 'react-native';
import TechniciansServices from '../services/TechniciansServices';
import SwitchToggle from 'react-native-switch-toggle';
import {ScrollView} from 'react-native-gesture-handler';
import JobsServices from '../services/JobsServices';


MapboxGL.setAccessToken(
  'pk.eyJ1Ijoiay1tb2hhbWVkIiwiYSI6ImNrM3VxN3dibTBmMXAzam9wbWlmaTM4NGgifQ.N_Vi-V8h9Lmv9pBO700dJw',
);
const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    backgroundColor: '#e6e6e6',
  },
  container: {
    height: 330,
    width: '100%',
  },
  map: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});

let initialState = {
  name: '',
  serviceName: '',
  isActive: 0,
  numberOfOrders: 0,
  rating: 0,
  jobDescription: '',
  jobLat: -1,
  jobLong: -1,
  jobTime: '',
  locationDescription: 'No Scheduled Jobs',
  jobState: 0,
  jobId: -1,
  user:{}
};
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.getTechnicianCallBack = this.getTechnicianCallBack.bind(this);
    this.callback = this.callback.bind(this);
    this.updateJobState = this.updateJobState.bind(this);
    this.updateCallBack = this.updateCallBack.bind(this);
    this.renderJobComponents = this.renderJobComponents.bind(this);
    this.updateTechnicianState = this.updateTechnicianState.bind(this);
    this.initializeComponent = this.initializeComponent.bind(this);

  }

  async componentDidMount() {
    this.listener = this.props.navigation.addListener(
      'didFocus',
      this.initializeComponent,
    );
  }
  async initializeComponent(){
    this.setState(initialState);
    let user = await StorageHelper.getUser();
    this.setState({user});
    TechniciansServices.GetTechnicianWithId(
      user.Id,
      this.getTechnicianCallBack,
    );
  }

  updateTechnicianState(isActive){
    TechniciansServices.patchTechnician(this.state.user.Id,{IsOnline:isActive},(response)=>{console.log(response)});
  }
  getTechnicianCallBack(response) {
    let res = response.response;
    console.log(response);
    let isActive = res.IsOnline;
    if (res)
      this.setState({
        name: res.Name,
        serviceName: res.ServiceName,
        isActive: isActive,
        numberOfOrders: res.NumberOfOrders,
        rating: res.Rating,
      });
    JobsServices.getCurrentJob(res.Id, this.callback);
  }
  callback(response) {
    console.log(response);

    if (response.status == 404) {
      return;
    }
    let job = response.response;
    this.setState({
      jobLat: job.Latitude,
      jobLong: job.Longitude,
      jobDescription: job.Description,
      locationDescription: job.LocationDescription,
      jobState: job.JobState,
      jobId: job.Id,
      jobTime: new Date(job.Time).toLocaleString(),
    });
  }

  updateJobState() {
    let jobState = this.state.jobState == 1 ? 5 : 2;
    JobsServices.PatchJobState(
      this.state.jobId,
      {JobState: jobState},
      this.updateCallBack,
    );
  }

  updateCallBack(response) {
    if (response.status == 200) {
      this.forceUpdate();
    }
  }

  renderJobComponents() {
    let buttonText = this.state.jobState == 1 ? 'Start Job' : 'Finish Job';
    let color = '#303030';
    let button = (
      <Button color={color} title={buttonText} onPress={this.updateJobState} />
    );
    if (this.state.jobState == 0) {
      button = (
        <Button
          color={color}
          title={'View Pending Jobs'}
          onPress={() => this.props.navigation.navigate('JobRequests')}
        />
      );
    }
    return (
      <View>
        <Text>Current Job</Text>
        <Text>{this.state.locationDescription}</Text>
        <Text>{this.state.jobTime}</Text>
        <Text>{this.state.jobDescription}</Text>
        <View style={styles.container}>
          <MapboxGL.MapView
            ref={c => (this._map = c)}
            style={styles.map}
            onLongPress={this.getLocation}>
            <MapboxGL.UserLocation visible={true} />
            <MapboxGL.Camera
              defaultSettings={{
                zoomLevel: 0,
              }}
              followUserLocation={true}
              followUserMode={'normal'}
            />
            <MapboxGL.PointAnnotation
              key={'marker'}
              id={'marker'}
              coordinate={[this.state.jobLat, this.state.jobLong]}
              title={'location'}
              style={{display: 'none'}}
            />
          </MapboxGL.MapView>
        </View>
        {button}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.page}>
        <View>
          <View style={{paddingLeft: 150}}>
            <SwitchToggle
              containerStyle={{
                marginTop: 16,
                width: 108,
                height: 48,
                borderRadius: 25,
                backgroundColor: 'white',
                padding: 5,
              }}
              circleStyle={{
                width: 38,
                height: 38,
                borderRadius: 19,
                backgroundColor: 'white',
              }}
              switchOn={this.state.isActive}
              onPress={() =>{this.setState({isActive: !this.state.isActive});this.updateTechnicianState(!this.state.isActive);}}
              circleColorOff="white"
              circleColorOn="red"
              duration={500}
              backgroundColorOn="white"
            />
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 25}}>
            {this.state.name}
          </Text>

          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            Rating:
            <Text style={{fontWeight: 'normal', fontSize: 16}}>
              {this.state.rating}
            </Text>
          </Text>

          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            NumberOfOrders:
            <Text style={{fontWeight: 'normal', fontSize: 16}}>
              {this.state.numberOfOrders}
            </Text>
          </Text>
        </View>
        {this.renderJobComponents()}
      </View>
    );
  }
}
