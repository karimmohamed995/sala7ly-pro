import React from 'react';
import {StyleSheet, View, Button, PermissionsAndroid} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import StorageHelper from '../../helpers/StorageHelper';
import Bubble from '../../components/Bubble';
import {Text} from 'react-native';
import LocationsServices from '../../services/LocationsServices';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoiay1tb2hhbWVkIiwiYSI6ImNrM3VxN3dibTBmMXAzam9wbWlmaTM4NGgifQ.N_Vi-V8h9Lmv9pBO700dJw',
);
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#483d8b',
  },
  container: {
    height: '100%',
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

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: [30, 30],
      locationName: 'Long press to Select a location',
      showMarker: false,
    };
    this.getLocation = this.getLocation.bind(this);
    this.locationCallback = this.locationCallback.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
  }

  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Please enable location permission.',
        },
      );

      if(granted == PermissionsAndroid.RESULTS.GRANTED) {
        this.forceUpdate();
      } 
    } catch (err) {}



    MapboxGL.setTelemetryEnabled(false);
    let user = await StorageHelper.getUser();
    alert('Hello ' + user.Name);
  }

  gotoServiceSelection = () => {
    StorageHelper.setLocationArray([this.state.coordinates[0], this.state.coordinates[1]]);
    StorageHelper.setLocationName(this.state.locationName);
    this.props.navigation.navigate('ServiceSelection');
  };

  async getLocation(p) {
    const XYcoordinates = await this._map.getPointInView(
      p.geometry.coordinates,
    );
    const coordinates = await this._map.getCoordinateFromView(XYcoordinates);
    this.setState({coordinates});
    LocationsServices.GetLocationName(
      coordinates[1],
      coordinates[0],
      this.locationCallback,
    );
  }

  locationCallback(response) {
    this.setState({locationName: response.response,showMarker:true});
  }

  renderMarker() {
    if (this.state.showMarker) {
      return (
        <MapboxGL.PointAnnotation
          key={'marker'}
          id={'marker'}
          coordinate={[this.state.coordinates[0], this.state.coordinates[1]]}
          title={'location'}
          style={{display: 'none'}}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView
            ref={c => (this._map = c)}
            style={styles.map}
            onLongPress={this.getLocation}>
            <MapboxGL.UserLocation visible={true} />
            <MapboxGL.Camera
              defaultSettings={{
                zoomLevel: 16,
              }}
              followUserLocation={true}
              followUserMode={'normal'}
            />
            {this.renderMarker()}
          </MapboxGL.MapView>
        </View>
        <Bubble style ={{borderRadius:0}}>
          <Text style={{textAlign: 'center',fontWeight:'bold',fontSize:15,margin:10}}>{this.state.locationName}</Text>
          <Button
            onPress={this.gotoServiceSelection}
            key={'btn'}
            title={'Confirm order address'}
            disabled={!this.state.showMarker}
            color="#303030"
          />
        </Bubble>
      </View>
    );
  }
}
