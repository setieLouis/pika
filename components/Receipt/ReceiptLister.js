import React from 'react';
import {FlatList, Text, StyleSheet, View} from 'react-native';
import ReceiptHeader from './ReceiptHeader';
import {
  deleteReceipt,
  findReceiptByShopId,
  toArray,
} from '../database/Paperbase';
import ReceiptItem from './ReceiptItem';

export default class ReceiptLister extends React.Component {
  constructor(props) {
    super(props);
    this.allReceipt = toArray(
      findReceiptByShopId(this.props.route.params.shopId),
    );

    this.state = {
      socialFlag: false,
      selectedList: [],
      receipts: this.allReceipt,
    };
  }

  render() {
    return (
      <View style={style.container}>
        <ReceiptHeader
          value={this.props.route.params.shopName}
          socialFlag={this.state.socialFlag}
          goBack={this._goBack}
          socialHeaderHide={this._hideToolHeader}
          socialDelete={this._deleteReceipt}
          socialShare={this._shareReceipt}
        />
        <FlatList
          data={this.state.receipts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={obj => (
            <ReceiptItem
              selected={this._isSelected(obj.item.id)}
              onPress={this._showToolHeader}
              receipt={obj.item}
            />
          )}
        />
      </View>
    );
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _showToolHeader = (id, flag) => {
    if (flag) {
      this.setState(
        {
          selectedList: [...this.state.selectedList, id],
        },
        this._checkHideToolHeader,
      );
    } else {
      this.setState(
        {
          selectedList: this.state.selectedList.filter(index => {
            return index !== id;
          }),
        },
        this._checkHideToolHeader,
      );
    }
  };

  _checkHideToolHeader = () => {
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
  };

  _isSelected(index) {
    return this._onArray(this.state.selectedList, index);
  }

  _onArray(list, index) {
    if (list.length === 0) {
      return false;
    }

    const container = list.filter(el => el === index);
    return container.length === 0 ? false : true;
  }

  _deleteReceipt = () => {
    const tmpSelected = this.state.selectedList;
    this.setState(
      {
        receipts: this.state.receipts.filter(
          el => !this._onArray(tmpSelected, el.id),
        ),
      },
      () => {
        this.allReceipt.forEach(el => {
          if (this._onArray(tmpSelected, el.id)) {
            deleteReceipt(el);
          }
        });

        this._hideToolHeader();
      },
    );
  };
  _shareReceipt = () => {
    console.log('share all selected receipt');

    this._hideToolHeader();
  };
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
