import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {color} from 'react-native-reanimated';
const windowWidth = Math.ceil(Dimensions.get('window').width - 360) / 3;
export default class PaperContainer extends React.Component {
  render() {
    const {tag, pressAction, longPressAction, cas} = this.props;
    return (
        <Icon name={'folder'} size={100} color={'#0384fc'} />

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

 <TouchableOpacity
 onLongPress={() => longPressAction(tag)}
 onPress={() => pressAction(tag.id, tag.tag)}
 style={{
          width: 130,
          height: 130,
          borderRadius: 2,
          backgroundColor: '#fff',
          margin: 20,

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
