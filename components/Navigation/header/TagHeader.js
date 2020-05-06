import React from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  Animated,
  TouchableOpacity,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const tabWidth = (Dimensions.get('window').width * 90) / 100;
const left = (Dimensions.get('window').width - tabWidth) / 2;

export default class TagHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchIndex: 0,
      searchWidth: new Animated.Value(tabWidth),
      searchPos: new Animated.Value(left),
    };
  }
  render() {
    const {nav} = this.props;
    console.log(nav.route);

    return (
      <View
        style={{
          height: 80,
          width: '100%',
          backgroundColor: '#fff',
          borderWidth: 0,
        }}>
        <View
          style={{
            height: 80,
            width: tabWidth,
            backgroundColor: '#0ca832',
            position: 'absolute',
            left,
            top: 0,
            zIndex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>Paper</Text>
          <TouchableOpacity onPress={() => this._espandSearch()}>
            <Icon name={'md-search'} size={30} color={'#000'} />
          </TouchableOpacity>
        </View>
        <Animated.View
          style={[
            {
              height: 80,
              width: 0,
              backgroundColor: '#a8000c',
              position: 'absolute',
              left,
              top: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: this.state.searchIndex,
            },
            {
              width: this.state.searchWidth,
              left: this.state.searchPos,
            },
          ]}>
          <TouchableOpacity
            style={{backgroundColor: '#fff'}}
            onPress={() => this._closeSearch()}>
            <Icon name={'md-arrow-back'} size={25} color={'#000'} />
          </TouchableOpacity>
          <TextInput
            placeholder={'Search...'}
            placeholderTextColor={'#919291'}
            onChangeText={text => nav.route.params.search(text)}
            style={{
              height: 80,
              width: '100%',
              borderBottomColor: '#fff',
              fontSize: 17,
              paddingRight: 30,
              paddingLeft: 20,
              fontFamily: 'BrandonGrotesque-Light',
              color: '#000000',
              zIndex: 0,
            }}
          />
        </Animated.View>
      </View>
    );
  }

  _closeSearch() {
    this.setState(
      {
        searchWidth: new Animated.Value(tabWidth),
        searchPos: new Animated.Value(left),
      },
      () => {
        Animated.parallel([
          Animated.timing(this.state.searchWidth, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear(),
            useNativeDriver: false,
          }),
        ]).start();
      },
    );
  }

  _espandSearch() {
    this.setState(
      {
        searchIndex: 1,
        searchWidth: new Animated.Value(0),
        searchPos: new Animated.Value(tabWidth + left),
      },
      () => {
        Animated.parallel([
          Animated.timing(this.state.searchWidth, {
            toValue: tabWidth,
            duration: 600,
            easing: Easing.linear(),
            useNativeDriver: false,
          }),
          Animated.timing(this.state.searchPos, {
            toValue: left,
            duration: 600,
            easing: Easing.linear(),
            useNativeDriver: false,
          }),
        ]).start();
      },
    );
  }
}

/**
 < View
 style={{
                position: 'absolute',
                left,
                top: 0,
                height: 80,
                width:
                zIndex: 2,
                backgroundColor: '#fff',
                borderWidth: 0,
                flexDirection: 'row',

                alignItems: 'center',
            }}>
 <View
 style={{
          height: 80,
          width: '100%',
          backgroundColor: '#fff',
          borderWidth: 0,
        }}>
 < View
 style={{
            position: 'absolute',
            left,
            top: 0,
            height: 80,
            width:
            zIndex: 2,
            backgroundColor: '#fff',
            borderWidth: 0,
            flexDirection: 'row',

            alignItems: 'center',
          }}>
 <TouchableOpacity
 style={{backgroundColor: '#fff'}}
 onPress={() => this._setIndexUnder(0)}>
 <Icon name={'md-arrow-back'} size={25} color={'#000'} />
 </TouchableOpacity>
 <TextInput
 placeholder={'Search...'}
 placeholderTextColor={'#919291'}
 onChangeText={text => nav.route.params.search(text)}
 style={{
              height: 80,
              width: '100%',
              borderBottomColor: '#fff',
              fontSize: 17,
              paddingRight: 30,
              paddingLeft: 20,
              fontFamily: 'BrandonGrotesque-Light',
              color: '#000000',
            }}
 />
 </View>
 <View
 style={{
            position: 'absolute',
            left,
            top: 0,
            height: 80,
            width: w,
            backgroundColor: '#fff',
            borderWidth: 0,
            zIndex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
 <Text style={{fontSize: 20, fontWeight: 'bold'}}>Paper</Text>
 <Text style={{fontSize: 20}}>AE6523</Text>
 <TouchableOpacity
 style={{backgroundColor: '#fff'}}
 onPress={() => this._setIndexUnder(2)}>
 <Icon name={'md-search'} size={30} color={'#000'} />
 </TouchableOpacity>
 </View>
 </View>

 **/
