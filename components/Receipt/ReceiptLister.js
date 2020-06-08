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

    this.state = {
      socialFlag: false,
      selectedList: [],
    };
  }

  render() {
    return (
      <View style={style.container}>
        <ReceiptHeader
          socialFlag={this.state.socialFlag}
          goBack={this._goBack}
          socialHeaderHide={this._hideToolHeader}
        />
        <FlatList
          data={[re, re, re]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={obj => (
            <ReceiptItem
              selected={this._isSelected(obj.index)}
              onPress={this._showToolHeader}
              receipt={obj}
            />
          )}
        />
      </View>
    );
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _showToolHeader = (element, flag) => {
    console.log(element.index);
    if (flag) {
      this.setState(
        {
          selectedList: [...this.state.selectedList, element.index],
        },
        this._checkHideToolHeader,
      );
    } else {
      this.setState(
        {
          selectedList: this.state.selectedList.filter(index => {
            return index !== element.index;
          }),
        },
        this._checkHideToolHeader,
      );
    }
  };

  _checkHideToolHeader = () => {
    console.log(this.state.selectedList);

    if (this.state.socialFlag && this.state.selectedList.length === 0) {
      this.setState({
        socialFlag: false,
      });
    } else if (!this.state.socialFlag && this.state.selectedList.length > 0) {
      this.setState({
        socialFlag: true,
      });
    }
  };

  _hideToolHeader = () => {
    this.setState({
      selectedList: [],
      socialFlag: false,
    });
  }

  _isSelected(index) {
    if (this.state.selectedList.length === 0) {
      return false;
    }

    const container = this.state.selectedList.filter(el => el === index);
    return container.length === 0 ? false : true;
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
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
