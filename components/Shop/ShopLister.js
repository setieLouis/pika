import React from 'react';
import {View} from 'react-native';
import ShopHeader from './ShopHeader';

export default class ShopLister extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ShopHeader />
      </View>
    );
  }
}
