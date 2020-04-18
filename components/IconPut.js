import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const RightBtn = function(rightCmp, rightCmpAction) {
  if (rightCmp !== undefined && rightCmpAction) {
    return (
      <TouchableOpacity
        onPress={() => rightCmpAction()}
        style={{
          backgroundColor: '#fff',
          position: 'absolute',
          right: 0,
          top: 16,
          marginRight: 10,
        }}>
        {rightCmp}
      </TouchableOpacity>
    );
  }
  return (
    <View style={{position: 'absolute', right: 0, top: 20, marginRight: 10}} />
  );
};

export default class IconPut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  render() {
    const {label, placeholder, rightCmp, content, rightCmpAction} = this.props;

    return (
      <View style={{marginTop: 10}}>
        <Text
          style={{
            paddingLeft: 20,
            fontFamily: 'BrandonGrotesque-Medium',
            fontSize: 17,
            color: '#210E4A',
          }}>
          {label}
        </Text>
        <View
          style={{
            borderColor: 'gray',
            borderBottomWidth: 1,
            borderBottomColor: '#bfbfbf',
          }}>
          <View
            style={{
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              width: 55,
            }}>
            <Icon name={content} size={30} color={'#000'} />
          </View>
        </View>
        {RightBtn(rightCmp, rightCmpAction)}
      </View>
    );
  }

  _getValue(content) {
    if (content !== undefined) {
      return content.value;
    }
  }
}
