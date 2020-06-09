import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ShopLister from '../Shop/ShopLister';
import {Animated, Easing, Text, TextInput, View} from 'react-native';

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
