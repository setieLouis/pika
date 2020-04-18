import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

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

export default class TextPut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  render() {
    const {
      label,
      placeholder,
      inputValue,
      rightCmp,
      content,
      rightCmpAction,
    } = this.props;

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
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={'#919291'}
          onChangeText={text => inputValue(text)}
          style={{
            height: 40,
            borderColor: 'gray',
            borderBottomWidth: 1,
            borderBottomColor: '#bfbfbf',
            fontSize: 17,
            paddingRight: 30,
            paddingLeft: 20,
            fontFamily: 'BrandonGrotesque-Light',
            color: '#3D83FE',
          }}
          value={this._getValue(content)}
        />
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
