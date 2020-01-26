import React from 'react';
import {StyleSheet, View, Button, PermissionsAndroid} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import StorageHelper from '../../helpers/StorageHelper';
import SwitchButton from 'switch-button-react-native';
import {Text} from 'react-native';
import TechniciansServices from '../../services/TechniciansServices';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoiay1tb2hhbWVkIiwiYSI6ImNrM3VxN3dibTBmMXAzam9wbWlmaTM4NGgifQ.N_Vi-V8h9Lmv9pBO700dJw',
);
const styles = StyleSheet.create({});

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      serviceName:"",
      isActive:0,
      numberOfOrders:0,
      rating:0
    };
    this.getTechnicianCallBack = this.getTechnicianCallBack.bind(this);
  }

  async componentDidMount() {
    let user = await StorageHelper.getUser();
    TechniciansServices.GetTechnicianWithId(user.Id,this.getTechnicianCallBack);
  }

  getTechnicianCallBack(response){
    console.log(response);
    let res = response.response;
    let isActive = res.IsOnline? 1:0; 
    if(res)
    this.setState({
      name:res.Name,
      serviceName:res.ServiceName,
      isActive: isActive,
      numberOfOrders: res.NumberOfOrders,
      rating:res.Rating 
    })
  }


  render() {
    return (
      <View>
       <SwitchButton //TODO styling
                activeSwitch = {this.state.isActive + 1}
                onValueChange={(val) => console.log(val)}      // this is necessary for this component
                text2 = 'Online'                        // optional: first text in switch button --- default ON
                text1 = 'Offline'                       // optional: second text in switch button --- default OFF
                switchWidth = {100}                 // optional: switch width --- default 44
                switchHeight = {44}                 // optional: switch height --- default 100
                switchdirection = 'rtl'             // optional: switch button direction ( ltr and rtl ) --- default ltr
                switchBorderRadius = {100}          // optional: switch border radius --- default oval
                switchSpeedChange = {500}           // optional: button change speed --- default 100
                switchBorderColor = '#d4d4d4'       // optional: switch border color --- default #d4d4d4
                switchBackgroundColor = '#fff'      // optional: switch background color --- default #fff
                btnBorderColor = '#00a4b9'          // optional: button border color --- default #00a4b9
                btnBackgroundColor = '#00bcd4'      // optional: button background color --- default #00bcd4
                fontColor = '#b1b1b1'               // optional: text font color --- default #b1b1b1
                activeFontColor = '#fff'            // optional: active font color --- default #fff
            />
        <Text>Name:{this.state.name}</Text>
        <Text>ServiceName:{this.state.serviceName}</Text>
        <Text>Rating:{this.state.rating}</Text>
        <Text>NumberOfOrders:{this.state.numberOfOrders}</Text>
      </View>
    );
  }
}
