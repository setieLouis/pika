import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../Welcome';
import TagCreation from '../TagCreation';

const Stack = createStackNavigator();

export default class Navigator extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Welcome} />
        <Stack.Screen name="Tag" component={TagCreation} />
      </Stack.Navigator>
    );
  }
}
