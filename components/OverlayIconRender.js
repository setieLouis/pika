import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Aws5Icon from 'react-native-vector-icons/FontAwesome5';

export default class extends React.Component {
  render() {
    const {element, value, action} = this.props;
    let color = '#5588a3';
    let backgroundColor = '#f1f3f4';

    if (element.item === value) {
      color = '#fff';
      backgroundColor = '#1089ff';
    }
    return (
      <TouchableOpacity onPress={() => action()}>
        <View
          style={{
            height: 60,
            width: 60,
            borderRadius: 40,
            backgroundColor,
            margin: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Aws5Icon name={element.item} size={30} color={color} />
        </View>
      </TouchableOpacity>
    );
  }
}

/**
 {
      ,
          () => {
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
            console.log(this.state.overlayCurrIconId);
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
          },
        );
      }
 **/
