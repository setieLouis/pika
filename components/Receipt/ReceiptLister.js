import React from 'react';
import {FlatList, Text, StyleSheet, View} from 'react-native';
import ReceiptHeader from './ReceiptHeader';
import {findReceiptByShopId, toArray} from '../database/Paperbase';

const re =
  '                *ESSELUNGA S.P.A*             {*}' +
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
  '\nTOTALE                    3,55' +
  '\n' +
  '\nTRANSAZIONE AUTORIZZATTA' +
  '\n*****      {RECEVUTA DI PAGAMENTO}       *****' +
  '\n**********************************************' +
  '\n ciao mama come va {q}' +
  '\n                *ESSELUNGA S.P.A*             {*}' +
  '\n            DOCUMENTO COMMERCIALE            ' +
  '\n' +
  '\n**********************************************' +
  '\n*****       RECEVUTA DI PAGAMENTO        *****' +
  '\nEsselunga via Famagosta' +
  '\nPrepagate Virtuali' +
  '\nS/E-CE 1163' +
  '\nCASSA: 006 ID 00116306' +
  '\nOPER: 27214 STAN 003452' +
  '\nC 721973******4850 keyed' +
  '\nCOD.AUT. 367506' +
  '\nRESIDUO: 0,00' +
  '\nACQ.ID 00000000029' +
  '\n' +
  '\n' +
  '\nTOTALE                    3,55' +
  '\n' +
  '\n' +
  '\nTRANSAZIONE AUTORIZZATTA' +
  '\n*****      {RECEVUTA DI PAGAMENTO}       *****' +
  '\n**********************************************' +
  '\n ciao mama come va {q}' +
  '\n                *ESSELUNGA S.P.A*             {*}' +
  '\n            DOCUMENTO COMMERCIALE            ' +
  '\n' +
  '\n' +
  '\n**********************************************' +
  '\n*****       RECEVUTA DI PAGAMENTO        *****' +
  '\nEsselunga via Famagosta' +
  '\nPrepagate Virtuali' +
  '\nS/E-CE 1163' +
  '\nCASSA: 006 ID 00116306' +
  '\nOPER: 27214 STAN 003452' +
  '\nC 721973******4850 keyed' +
  '\nCOD.AUT. 367506' +
  '\nRESIDUO: 0,00' +
  '\nACQ.ID 00000000029' +
  '\n' +
  '\n' +
  '\nTOTALE                    3,55' +
  '\n' +
  '\n' +
  '\nTRANSAZIONE AUTORIZZATTA' +
  '\n*****      {RECEVUTA DI PAGAMENTO}       *****' +
  '\n**********************************************' +
  '\n ciao mama come va {q}' +
  '\n                *ESSELUNGA S.P.A*             {*}' +
  '\n           DOCUMENTO COMMERCIALE            ' +
  '\n' +
  '\n' +
  '\n**********************************************' +
  '\n*****       RECEVUTA DI PAGAMENTO        *****' +
  '\nsselunga via Famagosta' +
  '\nPrepagate Virtuali' +
  '\nS/E-CE 1163' +
  '\nCASSA: 006 ID 00116306' +
  '\nOPER: 27214 STAN 003452' +
  '\nC 721973******4850 keyed' +
  '\nCOD.AUT. 367506' +
  '\nRESIDUO: 0,00' +
  '\nACQ.ID 00000000029' +
  '\n' +
  '\n' +
  '\nTOTALE                    3,55' +
  '\n' +
  '\n' +
  '\nTRANSAZIONE AUTORIZZATTA' +
  '\n*****      {RECEVUTA DI PAGAMENTO}       *****' +
  '\n**********************************************' +
  '\n ciao mama come va {q}';

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
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                    fontFamily: 'CourierNew-Regular',
                    borderColor: 'transparent',
                    borderWidth: 1,
                    fontWeight: 'normal',
                  }}>
                  {view.item}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
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
