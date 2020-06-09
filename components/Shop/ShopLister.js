import React from 'react';
import {FlatList, View} from 'react-native';
import ShopHeader from './ShopHeader';
import ListItem from '../ListItem';

const SHOPS = [
  {
    id: 0,
    name: 'Serafino',
    address: 'via Settembre',
    last_update_date: new Date(),
  },
  {
    id: 1,
    name: 'Pizza Per Tutti',
    address: 'Pza 25 novembre ',
    last_update_date: new Date(),
  },
  {
    id: 3,
    name: 'Grande Mercato',
    address: 'via della Mummia 5 ',
    last_update_date: new Date(),
  },
  {
    id: 4,
    name: 'Piccolo Mercato',
    address: 'via della disperazione 89 ',
    last_update_date: new Date(),
  },
  {
    id: 5,
    name: 'Da Yemi',
    address: 'via della MyGosh 89 ',
    last_update_date: new Date(),
  },
  {
    id: 6,
    name: 'Jolie',
    address: 'via della verdi 89 ',
    last_update_date: new Date(),
  },
  {
    id: 7,
    name: 'Petite fille',
    address: 'Piazza Garilbadi Milano verdi 89 ',
    last_update_date: new Date(),
  },
  {
    id: 9,
    name: 'Al lago',
    address: 'via Como Milano verdi 89 ',
    last_update_date: new Date(),
  },
  {
    id: 10,
    name: 'Al lago',
    address: 'via Como Milano verdi 89 ',
    last_update_date: new Date(),
  },
];
export default class ShopLister extends React.Component {
  constructor(props) {
    super(props);
    this.infoCpy = [];
    this.state = {
      infos: SHOPS, //findAllShop(),
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
            <ListItem
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

  _goTo = () => {
    this.props.navigation.navigate('receipt_lister');
  }
  _setSocial = flag => {
    this.setState({
      showSocial: flag,
    });
  };

  _socialDelete = () => {
    console.log('delete ' + this.state.selected.name);
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
    console.log(text);
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
