import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {getPaper} from './caller/PaperCaller';
import {ListItem} from 'react-native-elements';
import Welcome from './Welcome';
import QRCode from 'react-native-qrcode-svg';

const response =
  '|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}';

const list = response.split('|');

function row(carat) {
  return <Text>carat</Text>;
}
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.content = '|';
    this.state = {
      rows: [],
    };
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', margin: 15, padding: 15}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={list}
          renderItem={obj => this._getRow(obj.item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
  componentDidMount(): void {
    this.setState({
      rows: getPaper(
        this.props.route.params.tagId,
        this.props.route.params.paper_meta.id,
      ).paper,
    });
  }

  _getRow(item) {
    console.log(item);
    let weight = 'normal';
    const last = item.substring(item.length - 1);

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
              <QRCode size={70} value="http://awesome.link.qr" />
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
      **/
