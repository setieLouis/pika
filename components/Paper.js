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
import {findBlockByid} from './database/Paperbase';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

const heigth = Dimensions.get('window').height;
const val = heigth - 950;
const interval = val < 0 ? 60 : 80;
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.paper = findBlockByid(this.props.route.params.info).content.split('|');
    this.lower = 0;

    this.scrollY = 0;
    this.state = {
      paperView: this._addLine(),
    };
  }
  render() {
    let ar = [];
    const list = findBlockByid(this.props.route.params.info).content.split('|');
    let view = list.slice(0, 50).map((element, index) => {
      return this._getRow(element);
    });

    ar.push(view);
    ar.push(<Text>Ciai</Text>);

    const ciao = ar.map(el => el);

    return (
      <View>
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
            {this.props.route.params.negozio}
          </Text>

          <TouchableOpacity
            style={{marginRight: 15}}
            onPress={this._showSearchHeaderBtn}>
            <IonIcon name={'ios-share-alt'} size={30} color={'#fff'} />
          </TouchableOpacity>
        </View>

        <ScrollView
          onScroll={({nativeEvent}) => {
            //console.log(nativeEvent)
            this._reached(nativeEvent);
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              marginLeft: 15,
              marginRight: 15,
              marginTop: 100,
              padding: 15,
            }}>
            {this.state.paperView}
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

  _reached({contentOffset, layoutMeasurement, contentSize}) {
    if (
      contentOffset.y + layoutMeasurement.height >= contentSize.height - 50 &&
      this.lower < this.paper.length &&
      this._scrollToDown(contentOffset.y)
    ) {
      this.scrollY = contentOffset.y;
      this.setState({
        paperView: [this.state.paperView, this._addLine()].map(ele => ele),
      });
    }
  }

  _addLine() {
    const upper =
      this.paper.length < this.lower + interval
        ? this.paper.length
        : this.lower + interval;
    const list = this.paper.slice(this.lower, upper).map(element => {
      return this._getRow(element);
    });
    this.lower = upper;
    console.log(this.lower);
    return list;
  }

  _scrollToDown(y) {
    return this.scrollY < y;
  }
}
