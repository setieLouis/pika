import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './components/Navigation/Navigator';

import {Provider} from 'react-redux';
import Store from './components/store/configureStore';

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Provider store={Store}>
          <Navigator />
        </Provider>
      </NavigationContainer>
    );
  }
}
