import React from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import PaperContainer from './components/PaperContainer';

export default class App extends React.Component {
  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          marginTop: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: 5,
          }}>
          <PaperContainer />
          <PaperContainer />
          <PaperContainer />
          <PaperContainer />
          <PaperContainer />
          <PaperContainer />
          <PaperContainer />
          <PaperContainer />
          <PaperContainer />
          <PaperContainer />
          <PaperContainer />
        </View>
      </ScrollView>
    );
  }
}



