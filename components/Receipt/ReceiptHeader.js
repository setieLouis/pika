import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MatComIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ReceiptHeader extends React.Component {
  constructor(props) {
    super(props);
    this.flag = true;
  }
  render() {
    const {
      value,
      socialFlag,
      socialHeaderHide,
      socialDelete,
      socialShare,
      goBack,
    } = this.props;
    return (
      <View>
        <Animatable.View animation={'slideInLeft'} duration={250}>
          <Animatable.View
            animation={socialFlag ? 'fadeInLeft' : 'fadeInRight'}
            duration={250}>
            {this._getElememt(
              value,
              socialFlag,
              socialHeaderHide,
              socialDelete,
              socialShare,
              goBack,
            )}
          </Animatable.View>
        </Animatable.View>
      </View>
    );
  }

  _getElememt(
    value,
    socialFlag,
    socialHeaderHide,
    socialDelete,
    socialShare,
    goBack,
  ) {
    if (socialFlag) {
      return (
        <View
          style={[
            style.container,
            style.shadow,
            {backgroundColor: '#fff', justifyContent: 'space-between'},
          ]}>
          <TouchableOpacity
            style={{marginLeft: 15}}
            onPress={() => {
              socialHeaderHide();
            }}>
            <AntIcon name={'close'} size={30} color={'#0384fc'} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginRight: 15}}>
            <TouchableOpacity
              style={{margin: 10}}
              onPress={() => socialDelete()}>
              <MatComIcons name={'delete'} size={35} color={'#0384fc'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{margin: 10}}
              onPress={() => socialShare()}>
              <IonIcon name={'ios-share-alt'} size={35} color={'#0384fc'} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View
        style={[
          style.container,
          {backgroundColor: '#1089ff', justifyContent: 'space-between'},
        ]}>
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
          style={{marginLeft: 15}}>
          <AntIcon name={'arrowleft'} size={30} color={'#fff'} />
        </TouchableOpacity>
        <Text style={style.code}>{value}</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    width: '100%',
  },
  code: {
    fontSize: 25,
    fontFamily: 'BrandonGrotesque-Medium',
    textAlign: 'left',
    color: '#fff',
  },
  title: {
    marginLeft: 15,
    fontSize: 25,
    fontFamily: 'BrandonGrotesque-Medium',
    color: '#fff',
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
  },
});
