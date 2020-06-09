import React from 'react';
import {FlatList, View} from 'react-native';
import ShopHeader from './ShopHeader';
import ShopItem from './ShopItem';
import {findAllShop} from '../database/Paperbase';

export default class ShopLister extends React.Component {
  constructor(props) {
    super(props);
    this.infoCpy = [];
    this.state = {
      infos: findAllShop(),
      selected: {id: -1},
      showSocial: false,
    };
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ShopHeader
          social={this.state.showSocial}
          socialHeaderShow={this._unSelect}
          socialDelete={this._socialDelete}
          socialShare={() => {}}
          searchAction={this._filter}
          value={'78ASER'}
        />
        <FlatList
          data={this.state.infos}
          renderItem={obj => (
            <ShopItem
              idCurr={this.state.selected}
              element={obj.item}
              onLongPress={this._select}
              onPress={this._goTo}
            />
          )}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    );
  }

  _goTo = (id, name) => {
    this.props.navigation.navigate('receipt_lister', {
      shopId: id,
      shopName: name,
    });
  };

  _setSocial = flag => {
    this.setState({
      showSocial: flag,
    });
  };

  _socialDelete = () => {
    this._unSelect();
  };

  _unSelect = () => {
    this._setSocial(false);
    this.setState({
      selected: -1,
    });
  };

  _select = element => {
    this._setSocial(true);
    this.setState({
      selected: element,
    });
  };

  _filter = text => {
    text = text.toLowerCase();
    this.infoCpy = this.infoCpy.length > 0 ? this.infoCpy : this.state.infos;
    let tofilter =
      this.state.infos.length > 0 ? this.state.infos : this.infoCpy;

    let list = tofilter.filter(el => {
      const name = el.name.toLowerCase();
      const address = el.address.toLowerCase();
      return name.includes(text) || address.includes(text);
    });
    list = text.length > 0 ? list : this.infoCpy;
    this.setState({
      infos: list,
    });
  };
}
