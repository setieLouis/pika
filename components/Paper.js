import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {getPaper} from './caller/PaperCaller';

import QRCode from 'react-native-qrcode-svg';
""
export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const list = this.props.route.params.content.split('|');

    return (
      <View style={{flex: 1, backgroundColor: '#fff', margin: 15, padding: 15}}>
        {list.map(element => {
          return this._getRow(element);
        })}
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
/**
       * <Text style={{fontSize:15}}>Ciao Mamma cone va oggi</Text>
       <Text style={{fontSize:15, fontFamily:'CourierNew-Regular'}}>Ciao Mamma cone va oggi</Text>
       <Text style={{fontSize:15, fontFamily:'CourierNew-Regular'}}>**** ***** **** ** ****</Text>
       <Text style={{fontSize:15, fontFamily:'CourierNew-Regular'}}>---- ----- ---- -- ----</Text>
       <Text style={{fontSize:15, fontFamily:'CourierNew-Regular'}}>C                     i</Text>




       <QRCode
       value={this.state.text}
       size={200}
       bgColor="black"
       fgColor="white"
       />



 /*<FlatList
 showsVerticalScrollIndicator={false}
 data={list}
 renderItem={obj => this._getRow(obj.item)}
 keyExtractor={(item, index) => index.toString()}
 />
      **/
