import React from 'react';

import {Animated, Easing, ScrollView, Text} from 'react-native';
import {Overlay} from 'react-native-elements';
import Aws5Icon from 'react-native-vector-icons/FontAwesome5';
import {FlatList, TouchableOpacity, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ICONS from './static/ICONS';
import TextPut from './TextPut';

const overlayWdth = Math.floor((Dimensions.get('window').width * 85) / 100);
const overlayHgth = Math.floor((Dimensions.get('window').height * 90) / 100);
const marginLeft = (overlayWdth - 320) / 2;
function OverlayBtn(close, main, closeAction) {
  return (
    <TouchableOpacity
      onPress={() => closeAction()}
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
      }}>
      <Text
        style={{
          margin: 15,
          color: '#1089ff',
          fontFamily: 'BrandonGrotesque-Medium',
          fontSize: 18,
        }}>
        {close}
      </Text>
      <Text
        style={{
          margin: 15,
          color: '#1089ff',
          fontFamily: 'BrandonGrotesque-Medium',
          fontSize: 18,
        }}>
        {main}
      </Text>
    </TouchableOpacity>
  );
}

export default class IconOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideIcon: new Animated.Value(1),
    };
  }
  render() {
    const {
      visible,
      height,
      body,
      closeTitle,
      mainTitle,
      closeAction,
    } = this.props;
    console.log(visible);
    return (
      <Overlay
        isVisible={visible}
        width={overlayWdth}
        height={height}
        borderRadius={15}>
        <Animated.View style={{opacity: this.state.hideIcon}}>
          {body}
          {OverlayBtn(closeTitle, mainTitle, closeAction)}
        </Animated.View>
      </Overlay>
    );
  }

  componentDidMount(): void {
    Animated.timing(this.state.hideIcon, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear(),
      useNativeDriver: false,
    }).start(() => {
      this.setState({
        headerBtnIndex: 0,
      });
    });
  }
}

/*

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






        //
         <Overlay
        isVisible={visible}
        width={overlayWdth}
        height={200}
        borderRadius={15}
        overlayStyle={{justifyContent: 'center'}}>

        <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:10}}>
          <Text style={{margin:15, color:'#1089ff', fontFamily:'BrandonGrotesque-Medium', fontSize:18}}>Cancel</Text>
          <Text  style={{margin:15, color:'#1089ff', fontFamily:'BrandonGrotesque-Medium', fontSize:18}}>Icon</Text>
        </View>
      </Overlay>

 */
