import React from 'react';
import {
  View,
  TextInput,
  Dimensions,
  Animated,
  TouchableOpacity,
  Easing,
  StyleSheet,
} from 'react-native';
import {deleteTag} from '../../database/Paperbase';

import Icon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const tabWidth = (Dimensions.get('window').width * 90) / 100;
const left = (Dimensions.get('window').width - tabWidth) / 2;

export default class TagHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: undefined,
      searchIndex: 0,
      iconBarIndex: 0,
      searchWidth: new Animated.Value(0),
      iconBarWidth: new Animated.Value(0),
    };
    this.props.nav.navigation.setParams({actionBar: this._espandIconBar});
  }
  render() {
    const {nav} = this.props;

    return (
      <View
        style={{
          height: 80,
          width: '100%',
          backgroundColor: '#fff',
          borderWidth: 0,
        }}>
        <View style={[style.main]}>
          <TouchableOpacity onPress={() => this._espandSearch()}>
            <Icon name={'md-search'} size={30} color={'#000'} />
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            style.headerItem,
            {zIndex: this.state.searchIndex, width: this.state.searchWidth},
          ]}>
          <TouchableOpacity
            style={{backgroundColor: '#fff'}}
            onPress={() => this._closeSearch()}>
            <Icon name={'md-arrow-back'} size={25} color={'#000'} />
          </TouchableOpacity>
          <TextInput
            placeholder={'Search...'}
            placeholderTextColor={'#919291'}
            onChangeText={text => text}
            style={style.input}
          />
        </Animated.View>
        <Animated.View
          style={[
            style.headerItem,
            {zIndex: this.state.iconBarIndex, width: this.state.iconBarWidth},
          ]}>
          <TouchableOpacity onPress={() => this._updateTag()}>
            <MatIcon style={{margin:20}} name={'pencil'} size={25} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._deleteTag()}>
            <MatIcon name={'delete'} size={25} color={'#fff'} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  _updateTag() {
    this.props.nav.navigation.navigate('Tag', {tag: this.state.tag});
    this._closeIconBar(0);
  }

  _deleteTag() {
    deleteTag(this.state.tag);
  }

  _closeSearch() {
    Animated.timing(this.state.searchWidth, {
      toValue: 0,
      duration: 0,
      easing: Easing.linear(),
      useNativeDriver: false,
    }).start(() => {
      this.setState({
        searchIndex: 0,
      });
    });
  }

  _espandSearch() {
    this.setState(
      {
        searchIndex: 1,
      },
      () => {
        Animated.parallel([
          Animated.timing(this.state.searchWidth, {
            toValue: tabWidth,
            duration: 600,
            easing: Easing.linear(),
            useNativeDriver: false,
          }),
        ]).start();
      },
    );
  }

  _closeIconBar(val) {
    Animated.timing(this.state.iconBarWidth, {
      toValue: 0,
      duration: val,
      easing: Easing.linear(),
      useNativeDriver: false,
    }).start(() => {
      this.setState({
        iconBarIndex: 0,
      });
    });
  }

  _espandIconBar = tag => {
    this.setState(
      {
        tag: tag,
        iconBarIndex: 1,
      },
      () => {
        Animated.parallel([
          Animated.timing(this.state.iconBarWidth, {
            toValue: tabWidth,
            duration: 600,
            easing: Easing.linear(),
            useNativeDriver: false,
          }),
        ]).start();
      },
    );
  };
}

const style = StyleSheet.create({
  main: {
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
  },
  headerItem: {
    height: 80,
    width: 0,
    backgroundColor: '#a8000c',
    position: 'absolute',
    left,
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    height: 80,
    width: '100%',
    borderBottomColor: '#fff',
    fontSize: 17,
    paddingRight: 30,
    paddingLeft: 20,
    fontFamily: 'BrandonGrotesque-Light',
    color: '#000000',
    zIndex: 0,
  },
});
