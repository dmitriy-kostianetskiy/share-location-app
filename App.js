import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap';

export default class App extends React.Component {
  state = {
    userLocation: null,
    error: null
  }

  onGetLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      position => this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        },
        error: null
      }),
      error => this.setState({
        error: error
      })
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FetchLocation onGetLocation={this.onGetLocationHandler} />
        { 
          this.state.error 
          ? <Text>Unable to get location. Please try again.</Text>
          : <UsersMap userLocation={this.state.userLocation}/>
        }
      </View>
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
});
