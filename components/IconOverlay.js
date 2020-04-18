import React from 'react';
import {Overlay} from 'react-native-elements';
import {FlatList, TouchableOpacity, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ICONS from './static/ICONS';

const overlayWdth = Math.floor((Dimensions.get('window').width * 90) / 100);
const overlayHgth = Math.floor((Dimensions.get('window').height * 90) / 100);

export default class IconOverlay extends React.Component {
  render() {
    const {visible, icon} = this.props;
    return (
      <Overlay
        isVisible={visible}
        width={overlayWdth}
        height={overlayHgth}
        borderRadius={5}
        overlayStyle={{}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          numColumns={6}
          data={ICONS}
          renderItem={obj => (
            <TouchableOpacity
              onPress={() => icon(obj)}
              style={{
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                width: 55,
              }}>
              <Icon name={obj.item} size={30} color={'#000'} />
            </TouchableOpacity>
          )} //... toString() since it accepts string elements
          keyExtractor={(item, index) => index.toString()}
        />
      </Overlay>
    );
  }
}
