import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { getCurrentLocation } from '../utils/geolocation';

const delta = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

export default class UsersMap extends React.Component {
  state = {
    currentRegion: {
      latitude: 0,
      longitude: 0,
      ...delta
    }
  }

  async componentDidMount() {
    try {
      const location = await getCurrentLocation();

      this.setState({ 
        currentRegion: { 
          ...location.coords,
          ...delta
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View style={styles.mapContainer}>
        { 
          <MapView 
            style={styles.map}
            initialRegion={this.state.currentRegion}
            onRegionChangeComplete={this.props.onRegionChanged}
          >
            {
              this.props.locations && this.props.locations.map(x => 
                <MapView.Marker key={x.id} coordinate={x.location} title={x.name} />
              )
            }
          </MapView>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    marginTop: 2,
    marginBottom: 2,
    flex: 1
  },
  map: {
    flex: 1
  }
});
