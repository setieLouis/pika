import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {formatDate} from './Utility';

export default class ListItem extends React.Component {
  render() {
    const {element, onPress, onLongPress} = this.props;
    console.log(element)

    const backColot = this._getColor(this._toUpperLetter(element.negozio));
    return (
      <TouchableOpacity
        onPress={() => {
          onPress(element.tag, element.negozio);
        }}
        onLongPress={() => {
          onLongPress(element);
        }}
        style={{
          flex: 1,
          backgroundColor: '#fff',
          margin: 10,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#fff',
          }}>
          <View style={{marginRight: 10}}>
            <View
              style={{
                height: 60,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 15,
                  backgroundColor: backColot,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'BrandonGrotesque-Medium',
                    fontSize: 25,
                    color: '#fff',
                  }}>
                  {this._toUpperLetter(element.negozio)}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{flex: 3, flexDirection: 'column', backgroundColor: '#fff'}}>
            <Text
              style={{
                fontFamily: 'BrandonGrotesque-Medium',
                fontSize: 20,
                color: '#000',
                backgroundColor: '#fff',
              }}>
              {this._firstLetterUpper(element.negozio)}
            </Text>
            <Text
              style={{
                fontFamily: 'BrandonGrotesque-Light',
                fontSize: 18,
                color: '#919291',
              }}>
              {element.indirizzo}
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: 'column',
              backgroundColor: '#fff',
            }}>
            <Text
              style={{
                textAlign: 'right',
                fontFamily: 'BrandonGrotesque-Medium',
                marginTop: 3,
                backgroundColor: '#fff',
                color: '#919291',
                fontSize: 17,
              }}>
              {formatDate(element.data)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _toUpperLetter(s) {
    return s.charAt(0).toUpperCase();
  }

  _firstLetterUpper(s) {
    return this._toUpperLetter(s) + s.slice(1);
  }

  _getColor(s) {
    const color = ['#06623b', '#2e279d', '#035aa6', '#fa4659', '#f7be16'];
    const code = s.charCodeAt() % 5;
    return color[code];
  }
}
