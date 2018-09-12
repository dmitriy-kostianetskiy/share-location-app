import React from 'react';
import { Button, StyleSheet } from 'react-native';

const fetchLocation = props => {
  return (
    <Button style={styles.button}
      title="Where am I?" 
      onPress={props.onGetLocation} />
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
  }
})

export default fetchLocation;
