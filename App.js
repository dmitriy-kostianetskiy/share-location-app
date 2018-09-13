import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import CheckIn from './components/CheckIn';
import UsersMap from './components/UsersMap';
import { getCurrentLocation } from './utils/geolocation';
import { loading } from './utils/loading';
import { saveLocation, getLocations } from './data/location-data';


export default class App extends React.Component {
  state = {
    currentLocation: null,
    userName: null,
    locations: [],
    error: null,
    loading: null
  }

  onCheckInHandler = async () => {
    if (!this.state.userName || this.state.loading) {
      return;
    }

    await loading(this, async () => {
      const location = await saveLocation(this.state.currentLocation, this.state.userName);

      this.setState({
        locations: [
          ...this.state.locations,
          location
        ],
        currentLocation: location,
        error: null
      });
    })
  }

  onChangeName = (newName) => {
    this.setState({
      userName: newName
    });
  }

  onRefreshMapHandler = async () => {
    await this.loadLocations()
  }

  onRegionChangedHandler = async ({ latitude, longitude  }) => {
    this.setState({
      currentLocation: {
        latitude, 
        longitude
      }
    })
  }

  async loadLocations() {
    await loading(this, async () => {
      const locations = await getLocations();

      this.setState({
        locations
      });
    });
  }

  async componentDidMount() {
    await this.loadLocations();
  }

  render() {
    return (
      <View style={styles.container}>
        <CheckIn
          disabled={this.state.loading}
          onCheckIn={this.onCheckInHandler} 
          onChangeName={this.onChangeName}
        />
        { 
          this.state.error && 
          <Text>Unable to perform operation. Please try again.</Text> 
        }
        <UsersMap 
          userLocation={this.state.userLocation} 
          locations={this.state.locations}
          onRefreshMap={this.onRefreshMapHandler}
          onRegionChanged={this.onRegionChangedHandler}
        />
        <Button 
          disabled={this.state.loading} 
          title="Refresh" 
          onPress={this.onRefreshMapHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  }
});
