import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import AwsIcon from 'react-native-vector-icons/FontAwesome';
import Aws5Icon from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Math.ceil(Dimensions.get('window').width - 360) / 3;
const width = Dimensions.get('window').width;
const blockWidth = (width - 20) / 2;

const posIcon = Math.ceil((blockWidth * 40) / 100);
const posCheck = Math.ceil((blockWidth * 33) / 100);
export default class PaperContainer extends React.Component {
  render() {
    const {tag, pressAction, longPressAction, idCurr} = this.props;
    console.log('=========== on presente =========== ')
    console.log(idCurr)
    console.log('=========== on presente =========== ')
    let zindexBlocked = 0;
    let opacityBlocked = 0;

    let opacityCurr = 0;
    let zIndexCurr = 0;

    if (tag.id === idCurr) {
      opacityCurr = 1;
      zIndexCurr = 1;
    }
    if (idCurr !== -1 && idCurr !== tag.id) {
      zindexBlocked = 1;
      opacityBlocked = 1;
    }
    return (
      <View style={{}}>
        <View
          style={{
            position: 'absolute',
            left: 5,
            top: 5,
            width: blockWidth,
            height: 170,
            backgroundColor: '#transparent',
            zIndex: zindexBlocked,
            opacity: opacityBlocked,
            //opacity: this.state.overlayContianerOp,
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: 5,
            top: 5,
            width: blockWidth,
            height: 170,
            backgroundColor: '#transparent',
            zIndex: opacityCurr,
            opacity: zIndexCurr,
            //opacity: this.state.overlayContianerOp,
          }}>
          <View
            style={{
              position: 'absolute',
              left: posCheck,
              top: 45,
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#32e647',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Aws5Icon name={'check'} size={28} color={'#fff'} />
          </View>
        </View>

        <TouchableOpacity
          onLongPress={() => longPressAction(tag)}
          onPress={() => pressAction(tag.id, tag.tag)}
          style={{
            margin: 5,
            width: blockWidth,
            height: 170,
            padding: 10,
            backgroundColor: '#fff',
            alignItems: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              left: posIcon,
              top: '35%',
              zIndex: 1,
            }}>
            <Aws5Icon name={tag.icon} size={35} color={'#fff'} />
          </View>

          <AwsIcon name={'folder'} size={120} color={'#0384fc'} />

          <Text
            onPress={pressAction}
            style={{
              fontFamily: 'IBMPlexSerif-Regular',
              fontSize: 18,
              backgroundColor: '#fff',
              textAlign: 'center',
            }}>
            {tag.tag}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

/**
 *
 *
 *
 <View
 style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>

 <Text style={{color: '#0384fc'}}>{tag.tag + tag.id}</Text>
 </View>


 style={{

          borderRadius: 2,
          backgroundColor: '#fff',


          borderWidth: 1,
          borderColor: '#e4e9ed',
          /*shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,*/
/**marginBottom: windowWidth,
 borderWidth: 1,
 borderColor: '#edeff2',
}}>


</TouchableOpacity>
 **/
