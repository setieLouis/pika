import 'react-native-gesture-handler';
import React from 'react';
import Welcome from './components/Welcome';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './components/Navigation/Navigator';

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    );
  }
}
