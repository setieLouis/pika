import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const windowWidth = Math.ceil(Dimensions.get('window').width - 360) / 3;
export default class PaperContainer extends React.Component {
  render() {
    return (
      <View
        style={{
          width: 180,
          height: 180,
          borderRadius: 2,
          backgroundColor: '#fff',
          marginLeft: windowWidth,
          marginBottom: windowWidth,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
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
          <Icon name="shoppingcart" size={80} color="#4281ff" />
          <Text>Spesa casa</Text>
        </View>
      </View>
    );
  }
}
