import React from 'react';
import {Text, View} from 'react-native';
import ReceiptHeader from './ReceiptHeader';

export default class ReceiptLister extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ReceiptHeader/>
      </View>
    );
  }
}
