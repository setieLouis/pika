import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../Welcome';
import TagCreation from '../TagCreation';
import PaperLister from '../PaperLister';
import Paper from '../Paper';
import {Animated, Easing, Text, TextInput, View} from 'react-native';
import CreateTag from '../CreateTag';
const Stack = createStackNavigator();

export default class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWidth: new Animated.Value(0),
    };
  }
  render() {
    return (
      <Stack.Navigator initialRouteName={'paperLister'}>
        <Stack.Screen
          options={{headerShown: false}}
          name={'welcome'}
          component={Welcome}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Tag"
          component={TagCreation}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="paperLister"
          component={PaperLister}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="paper"
          component={Paper}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="create_tag"
          component={CreateTag}
        />
      </Stack.Navigator>
    );
  }
}
