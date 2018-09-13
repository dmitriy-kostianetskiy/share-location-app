import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const checkIn = props => {
  return (
    <View>
      <TextInput
        placeholder="What's your name?"
        onChangeText={props.onChangeName}
      />
      {
        <Button
          disabled={props.disabled}
          title="Check in" 
          onPress={props.onCheckIn} 
        />
      }
    </View>
  );
}

export default checkIn;
