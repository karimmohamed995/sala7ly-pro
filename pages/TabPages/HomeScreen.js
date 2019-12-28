import React, { Component } from "react";
import { StyleSheet, View, Button } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
MapboxGL.setAccessToken("pk.eyJ1Ijoiay1tb2hhbWVkIiwiYSI6ImNrM3VxN3dibTBmMXAzam9wbWlmaTM4NGgifQ.N_Vi-V8h9Lmv9pBO700dJw");
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#483d8b",
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1,
  }
});

export default class HomeScreen extends React.Component {
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }
  gotoServiceSelection =() =>{
    this.props.navigation.navigate('ServiceSelection')
  }
  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map} />
        </View>
        <Button title="qaqa" onPress={this.gotoServiceSelection}/>
      </View>
    );
  }
}