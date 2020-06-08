import React from 'react';
import {FlatList, Text, StyleSheet, View} from 'react-native';
import ReceiptHeader from './ReceiptHeader';
import {findReceiptByShopId, toArray} from '../database/Paperbase';
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

const re =
  '                {*}*ESSELUNGA S.P.A*{*}             ' +
  '\n            DOCUMENTO COMMERCIALE            ' +
  '\n' +
  '\n**********************************************' +
  '\n*****       RECEVUTA DI PAGAMENTO        *****' +
  '\nEsselunga via Famagosta\nPrepagate Virtuali' +
  '\nS/E-CE 1163' +
  '\nCASSA: 006 ID 00116306' +
  '\nOPER: 27214 STAN 003452' +
  '\nC 721973******4850 keyed' +
  '\nCOD.AUT. 367506' +
  '\nRESIDUO: 0,00\nACQ.ID 00000000029' +
  '\n' +
  '\n' +
  '{m*}TOTALE                    3,55{m*}' +
  '\n' +
  '\nTRANSAZIONE AUTORIZZATTA' +
  '\n*****      {RECEVUTA DI PAGAMENTO}       *****' +
  '\n**********************************************' +
  '\n' +
  '\n' +
  '{q}ciao mama come va{q}' +
  '\n' +
  '\n            DOCUMENTO COMMERCIALE            ';

export default class ReceiptLister extends React.Component {
  constructor(props) {
    super(props);
    this.paperList = toArray(findReceiptByShopId(1));
  }

  render() {
    return (
      <View style={style.container}>
        <ReceiptHeader />
        <FlatList
          data={[re]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={view => {
            return (
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  marginLeft: 15,
                  marginRight: 15,
                  marginTop: 10,
                  paddingBottom: 10,
                  paddingTop: 10,
                }}>
                <ParsedText
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                    fontFamily: 'CourierNew-Regular',
                    borderColor: 'transparent',
                    borderWidth: 1,
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
                  {view.item}
                </ParsedText>
              </View>
            );
          }}
        />
      </View>
    );
  }

  _strong(element, pattern) {
    const content = element.replace(/\{\*\}/gi, '');
    return content;
  }

  _qrCoder(element, pattern) {
    const content = element.replace(/\{q\}/gi, '');
    console.log(content);
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
    flex: 1,
    //backgroundColor: '#fff',
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
