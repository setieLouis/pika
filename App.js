import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './components/Navigation/Navigator';

import {Provider} from 'react-redux';
import Store from './components/store/configureStore';
import PushNotificationManager from './components/PushNotificationManager';

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Provider store={Store}>
          <PushNotificationManager>
            <Navigator />
          </PushNotificationManager>
        </Provider>
      </NavigationContainer>
    );
  }
}
