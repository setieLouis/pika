import React from 'react';
import {AppState, FlatList, TouchableOpacity, View} from 'react-native';
import ShopHeader from './ShopHeader';
import ShopItem from './ShopItem';
import {deleteShop, findAllReceipt, findAllShop} from '../database/Paperbase';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Notifications} from 'react-native-notifications';
import {connect} from 'react-redux';

const RECEIPT =
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

const SHOPS = [
  {
    id: 0,
    name: 'Serafino',
    address: 'via Settembre',
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

class ShopLister extends React.Component {
  constructor(props) {
    super(props);
    this.infoCpy = [];
    this.state = {
      infos: [],
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
        <TouchableOpacity
          onPress={() => {
            this.doSomeThing(0);
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ff0500',
            width: 60,

            height: 60,
            borderRadius: 30,

            position: 'absolute',
            left: '80%',
            top: '90%',
          }}>
          <Icon name={'plus'} size={30} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.doSomeThing(1);
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1089ff',
            width: 60,

            height: 60,
            borderRadius: 30,

            position: 'absolute',
            left: '60%',
            top: '90%',
          }}>
          <Icon name={'plus'} size={30} color={'#fff'} />
        </TouchableOpacity>
      </View>
    );
  }
  componentDidMount(): void {
    AppState.addEventListener('change', this._appStateDataHandler);
  }

  componentWillUnmount(): void {
    AppState.removeEventListener('change', this._appStateDataHandler);
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
    this.setState(
      {
        infos: this.state.infos.filter(
          shop => shop.id !== this.state.selected.id,
        ),
      },
      () => {
        const tmpSelected = this.state.selected;
        this._unSelect();
        this._deleteShop(tmpSelected);
      },
    );
  };

  _unSelect = () => {
    this._setSocial(false);
    this.setState({
      selected: -1,
    });
  };

  _select = element => {
    this._setSocial(true);
    this.setState(
      {
        selected: element,
      },
      () => console.log(this.state.selected),
    );
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

  doSomeThing(index) {
    Notifications.postLocalNotification({
      title: SHOPS[index].name,
      body: 'This notification was generated by the app!',
      extra: {
        shop: SHOPS[index],
        receipt: RECEIPT,
      },
    });
  }

  _appStateDataHandler = nextAppState => {
    switch (nextAppState) {
      case 'active':
        if (this.props.receiveNew) {
          this._getBaseData();
          this.setState({
            infos: this.props.stateShops,
          });
        }
        break;
      case 'background':
        this.props.stateDeleteShops.forEach(shop => {
          deleteShop(shop);
          //TODO WRITRE FIRST NEW ELEMENT
          this._resetUpdate();
        });
        break;

      default:
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        console.log('unknow state' + nextAppState);
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        break;
    }
  };

  _getBaseData = () => {
    const base = {
      shops: findAllShop(),
      receipts: findAllReceipt(),
    };
    const action = {
      type: 'GET_ALL_DATABASE',
      value: base,
    };
    this.props.dispatch(action);
  };

  _deleteShop = shop => {
    const action = {
      type: 'DELETE_SHOP',
      value: shop,
    };
    this.props.dispatch(action);
  };

  _resetUpdate = () => {
    const action = {
      type: 'RESET_UPDATE_SHOP',
    };
    this.props.dispatch(action);
  };

  _receiveNew() {
    this.props.dispatch({
      type: 'RESET_RECEIVE_NEW',
    });
  }
}
const mapStateToProps = state => {
  return {
    stateShops: state.shop.all,
    stateDeleteShops: state.shop.delete,
    receiveNew: state.shop.receiveNew,
  };
};
export default connect(mapStateToProps)(ShopLister);
