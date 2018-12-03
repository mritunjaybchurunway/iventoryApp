import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-material-ui';
const Loading = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size='large' />
      <Text style={{ textAlign: 'center' }}>{props.loadingText}</Text>
    </View>
  );
};

export default Loading;
