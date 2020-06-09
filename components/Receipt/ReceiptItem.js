import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import ParsedText from 'react-native-parsed-text';
import QRCode from 'react-native-qrcode-svg';

/**
 * {*}Strong{*}
 * {q}QrCode{q}
 * {b}size big 15{b}
 * {m}size Medium 13{m}
 * {n}size normal 10{n}
 * {b*}size big 15 with bold{b*}
 * {m*}size Medium 12 with bold{m*}
 * {n*}size normal 10 with bold{n*}
 */

export default class ReceiptItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: false,
    };
  }
  render() {
    const {receipt, onPress, selected} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          let flag = true;
          if (selected) {
            flag = false;
          }
          onPress(receipt.id, flag);
        }}
        style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
        <ParsedText
          style={{
            textAlign: 'center',
            fontSize: 10,
            fontFamily: 'CourierNew-Regular',
            borderColor: 'transparent',
            backgroundColor: '#fff',
            paddingBottom: 10,
            paddingTop: 10,
          }}
          parse={[
            {
              pattern: /{\*}[a-zA-Z0-9@?àé.*, ]{1,46}{\*}/,
              style: style.strong,
              renderText: this._strong,
            },
            {
              pattern: /{q}[a-zA-Z0-9@?àé.*, ]{1,46}{q}/,
              style: style.strong,
              renderText: this._qrCoder,
            },
            {
              pattern: /{b}[a-zA-Z0-9@?àé.*, ]{1,46}{b}/,
              style: style.size_big,
              renderText: this._big,
            },
            {
              pattern: /{m}[a-zA-Z0-9@?àé.*, ]{1,46}{m}/,
              style: style.size_medium,
              renderText: this._medium,
            },
            {
              pattern: /{s}[a-zA-Z0-9@?àé.*, ]{1,46}{s}/,
              style: style.size_small,
              renderText: this._small,
            },
            {
              pattern: /{b\*}[a-zA-Z0-9@?àé.*, ]{1,46}{b\*}/,
              style: style.strong_size_big,
              renderText: this._bigStrong,
            },
            {
              pattern: /{m\*}[a-zA-Z0-9@?àé.*, ]{1,46}{m\*}/,
              style: style.strong_size_medium,
              renderText: this._mediumStrong,
            },
            {
              pattern: /{s\*}[a-zA-Z0-9@?àé.*, ]{1,46}{s\*}/,
              style: style.strong_size_small,
              renderText: this._smallStrong,
            },
          ]}>
          {receipt.content}
        </ParsedText>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: selected ? 'rgba(16,137,255,0.31)' : 'transparent',
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        />
      </TouchableOpacity>
    );
  }

  _strong(element, pattern) {
    const content = element.replace(/\{\*\}/gi, '');
    return content;
  }

  _qrCoder(element, pattern) {
    const content = element.replace(/\{q\}/gi, '');
    return <QRCode size={70} value={content} />;
  }

  _big(element, pattern) {
    const content = element.replace(/\{b\}/gi, '');
    return content;
  }
  _bigStrong(element, pattern) {
    const content = element.replace(/\{b\*\}/gi, '');
    return content;
  }

  _medium(element, pattern) {
    const content = element.replace(/\{m\*\}/gi, '');
    return content;
  }
  _mediumStrong(element, pattern) {
    const content = element.replace(/\{m\*\}/gi, '');
    return content;
  }
  _small(element, pattern) {
    const content = element.replace(/\{s\}/gi, '');
    return content;
  }
  _smallStrong(element, pattern) {
    const content = element.replace(/\{s\*\}/gi, '');
    return content;
  }
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgba(210,165,33,0.56)',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    paddingBottom: 10,
  },
  strong: {
    fontWeight: 'bold',
  },
  size_big: {
    fontSize: 15,
  },
  size_medium: {
    fontSize: 12,
  },
  size_small: {
    fontSize: 10,
  },
  strong_size_big: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  strong_size_medium: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  strong_size_small: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});
