import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../Welcome';
import TagCreation from '../TagCreation';
import PaperLister from '../PaperLister';
import ShopLister from '../Shop/ShopLister';
import Paper from '../Paper';
import {Animated, Easing, Text, TextInput, View} from 'react-native';
import CreateTag from '../CreateTag';
import Ciao from '../Shop/ShopHeader';
import ReceiptLister from '../Receipt/ReceiptLister';
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
      <Stack.Navigator initialRouteName={'shop_lister'}>
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
        <Stack.Screen
          options={{headerShown: false}}
          name="shop_lister"
          component={ShopLister}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="receipt_lister"
          component={ReceiptLister}
        />
      </Stack.Navigator>
    );
  }
}
