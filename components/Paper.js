import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {getPaper} from './caller/PaperCaller';

import QRCode from 'react-native-qrcode-svg';
import {
  findAllReceipt,
  findBlockByid,
  toArray,
  findReceiptByShopId,
} from './database/Paperbase';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ReactHtmlParser from 'react-html-parser';
const heigth = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const val = heigth - 950;
const interval = val < 0 ? 60 : 80;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.paperList = toArray(
      findReceiptByShopId(this.props.route.params.shopId),
    );
    this.index = 0;
    this.state = {
      receiptList: [
        this._receipt(this._getReceipt()),
        this._receipt(this._getReceipt()),
        this._receipt(this._getReceipt()),
      ],
    };

    this.width = width;
  }
  render() {
    return (
      <View style={{backgroundColor: '#ebf0f6'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#1089ff',
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
            <AntIcon name={'arrowleft'} size={30} color={'#fff'} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'BrandonGrotesque-Medium',
              textAlign: 'left',
              color: '#fff',
            }}>
            {this.props.route.params.shopName}
          </Text>

          <TouchableOpacity
            style={{marginRight: 15}}
            onPress={this._showSearchHeaderBtn}>
            <IonIcon name={'ios-share-alt'} size={30} color={'#fff'} />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 70}}>
          <FlatList
            data={this.state.receiptList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={view => {
              console.log(
                '========================================================',
              );
              console.log(view);
              console.log(
                '========================================================',
              );

              return (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    marginLeft: 15,
                    marginRight: 15,
                    marginTop: 10,

                    paddingBottom: 10,
                  }}>
                  {view.item}
                </View>
              );
            }}
          />
        </View>
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

  _receipt(line) {
    const view = line.content.split('|').map(ele => this._getRow(ele));

    return view;
  }

  _getReceipt() {
    if (this.index < this.paperList.length) {
      return this.paperList[this.index++];
    }
  }
}

/**
 <FlatList
 data={this.state.receiptList}
 keyExtractor={(item, index) => index.toString()}
 renderItem={view => {
              console.log(
                '========================================================',
              );
              console.log(view);
              console.log(
                '========================================================',
              );

              return (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    marginLeft: 15,
                    marginRight: 15,
                    marginTop: 10,
                    paddingBottom: 10,
                  }}>
                  {view.item}
                </View>
              );
            }}
 />

 */
