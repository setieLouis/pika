import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const windowWidth = Math.ceil(Dimensions.get('window').width - 360) / 3;
export default class PaperContainer extends React.Component {
  render() {
    const {name, color, icon} = this.props;
    console.log(name);
    console.log(icon);
    return (
      <View
        style={{
          width: 180,
          height: 180,
          borderRadius: 2,
          backgroundColor: '#fff',
          marginLeft: windowWidth,
          marginTop: windowWidth / 2,
          marginBottom: windowWidth / 2,

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
                 borderColor: '#edeff2',**/
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name={icon} size={80} color={color} />
          <Text>{name}</Text>
        </View>
      </View>
    );
  }
}
