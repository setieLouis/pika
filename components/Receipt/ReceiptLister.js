import React from 'react';
import {FlatList, Text, StyleSheet, View} from 'react-native';
import ReceiptHeader from './ReceiptHeader';
import {findReceiptByShopId, toArray} from '../database/Paperbase';
import ReceiptItem from './ReceiptItem';

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
    this.selectedList = [];
    this.state = {
      socialFlag: false,
    };
  }

  render() {
    return (
      <View style={style.container}>
        <ReceiptHeader
          socialFlag={this.state.socialFlag}
          goBack={this._goBack}
        />
        <FlatList
          data={[re, re, re]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={obj => (
            <ReceiptItem onPress={this._showToolHeader} receipt={obj} />
          )}
        />
      </View>
    );
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _showToolHeader = (element, flag) => {
    if (flag) {
      this.selectedList.push(element.index);
    } else {
      this.selectedList = this.selectedList.filter(index => {
        return index !== element.index;
      });
    }
    this._checkToHideToolHeader();
  };

  _checkToHideToolHeader() {
    if (this.state.socialFlag && this.selectedList.length === 0) {
      this.setState({
        socialFlag: false,
      });
    } else if (!this.state.socialFlag && this.selectedList.length > 0) {
      this.setState({
        socialFlag: true,
      });
    }
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
});
