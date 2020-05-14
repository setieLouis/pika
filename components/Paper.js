import React from 'react';
import {View, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {getPaper} from './caller/PaperCaller';

import QRCode from 'react-native-qrcode-svg';
import {findBlockByid} from './database/Paperbase';
import AntIcon from 'react-native-vector-icons/AntDesign';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const list = findBlockByid(this.props.route.params.info).content.split('|');
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fff',
            height: 70,
            width: '100%',

            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 2,

            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 20,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 5,
          }}>
          <TouchableOpacity
            style={{marginLeft: 15}}
            onPress={() => this.props.navigation.goBack()}>
            <AntIcon name={'arrowleft'} size={30} color={'#000'} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'NanumGothic-Regular',
              textAlign: 'left',
              color: '#000',
            }}>
            {this.props.route.params.negozio}
          </Text>

          <TouchableOpacity
            style={{marginRight: 15}}
            onPress={this._showSearchHeaderBtn}>
            <AntIcon name={'sharealt'} size={25} color={'#000'} />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              marginLeft: 15,
              marginRight: 15,
              marginTop: 100,
              padding: 15,
            }}>
            {list.map(element => {
              return this._getRow(element);
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
  componentDidMount(): void {}

  _getRow(item) {
    let weight = 'normal';
    const last = item.toString().substring(item.length - 1);

    if (last === '}') {
      const func = item.substring(item.length - 2, item.length - 1);
      switch (func) {
        case '*':
          item = item.toString().replace('{*}', '');
          weight = 'bold';
          break;
        case 'q':
          return (
            <View style={{alignItems: 'center'}}>
              <Text />
              <QRCode size={70} value="http://awesome.link.qr" />
              <Text />
            </View>
          );
      }
    }
    return (
      <Text
        style={{
          textAlign: 'center',
          fontSize: 10,
          fontFamily: 'CourierNew-Regular',
          borderColor: 'transparent',
          borderWidth: 1,
          fontWeight: weight,
        }}>
        {item}
      </Text>
    );
  }
}
