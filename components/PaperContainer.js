import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import AwsIcon from 'react-native-vector-icons/FontAwesome';
import Aws5Icon from 'react-native-vector-icons/FontAwesome5';
import {color} from 'react-native-reanimated';
const windowWidth = Math.ceil(Dimensions.get('window').width - 360) / 3;

const width = Dimensions.get('window').width;
const blockWidth = (width - 20) / 2;
export default class PaperContainer extends React.Component {
  render() {
    const {tag, pressAction, longPressAction} = this.props;
    console.log(tag);
    return (
      <View
        style={{
          margin: 5,
          width: blockWidth,
          height: 170,
          padding: 10,
          backgroundColor: '#fff',
          alignItems: 'center',
        }}>
        <View
          style={{position: 'absolute', left: '45%', top: '35%', zIndex: 1}}>
          <Aws5Icon name={tag.icon} size={35} color={'#fff'} />
        </View>
        <TouchableOpacity
          onLongPress={() => longPressAction(tag)}
          onPress={() => pressAction(tag.id, tag.tag)}>
          <AwsIcon name={'folder'} size={120} color={'#0384fc'} />
        </TouchableOpacity>

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
