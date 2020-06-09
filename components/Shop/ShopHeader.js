import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInput,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MatComIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ShopHeader extends React.Component {
  constructor(props) {
    super(props);
    this.flag = true;
    this.state = {
      flagOne: false,
      flagTwo: false,
    };
  }
  render() {
    const {
      value,
      social,
      socialHeaderShow,
      socialDelete,
      socialShare,
      searchAction,
    } = this.props;
    return (
      <View style={{zIndex: 2}}>
        <Animatable.View animation={'slideInLeft'} duration={250}>
          <Animatable.View
            animation={
              this._checkFlagOne() || social ? 'fadeInLeft' : 'fadeInRight'
            }
            duration={250}>
            {this._getElememt(
              value,
              social,
              socialHeaderShow,
              socialDelete,
              socialShare,
              searchAction,
            )}
          </Animatable.View>
        </Animatable.View>
      </View>
    );
  }

  _getElememt(
    value,
    flag,
    socialHeaderShow,
    socialDelete,
    socialShare,
    searchAction,
  ) {
    if (this._checkFlagTwo()) {
      return (
        <View
          style={[
            style.container,
            style.shadow,
            {backgroundColor: '#fff', justifyContent: 'flex-start'},
          ]}>
          <TouchableOpacity
            style={{marginLeft: 15, backgroundColor: '#fff'}}
            onPress={() => {
              this._setFlag(false, false);
            }}>
            <AntIcon name={'close'} size={25} color={'#0384fc'} />
          </TouchableOpacity>
          <TextInput
            onChangeText={text => searchAction(text)}
            style={{width: 320, marginLeft: 10, backgroundColor: '#fff'}}
            placeholder={'Search...'}
          />
        </View>
      );
    } else if (flag) {
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
              socialHeaderShow();
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
        <Text style={style.title}>Pika</Text>
        <Text style={style.code}>{value}</Text>

        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() => {
            this._setFlag(true, true);
          }}>
          <IonIcon name={'md-search'} size={30} color={'#fff'} />
        </TouchableOpacity>
      </View>
    );
  }

  _setFlag = (f1, f2) => {
    this.setState({
      flagOne: f1,
      flagTwo: f2,
    });
  };

  _checkFlagOne = () => {
    return this.state.flagOne;
  };
  _checkFlagTwo = () => {
    return this.state.flagTwo;
  };
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

/**   <TouchableOpacity style={{marginLeft: 15}}>
 <AntIcon name={'arrowleft'} size={30} color={'#fff'} />
 </TouchableOpacity>
 **/
