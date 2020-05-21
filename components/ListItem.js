import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {formatDate} from './Utility';

export default class ListItem extends React.Component {
  render() {
    const {element, onPress, onLongPress, idCurr} = this.props;
    let zIndex = 0;
    let backgroundColor = '#f1f3f4';
    let color = '#426b80';
    if (idCurr.id !== -1 && idCurr.id !== element.id) {
      zIndex = 2;
    } else if (idCurr.id === element.id) {
      backgroundColor = '#1089ff';
      color = '#fff';
    }
    return (
      <View>
        <View
          style={{
            width: '100%',
            height: 80,
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex,
          }}
        />
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
                    width: 60,
                    height: 60,
                    borderRadius: 3,
                    backgroundColor, //backColot,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'BrandonGrotesque-Medium',
                      fontSize: 25,
                      color,
                    }}>
                    {this._toUpperLetter(element.negozio)}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 3,
                flexDirection: 'column',
                backgroundColor: '#fff',
              }}>
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
      </View>
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
