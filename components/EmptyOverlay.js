import React from 'react';
import {Overlay} from 'react-native-elements';
import {Animated} from 'react-native';

export default class EmptyOverlay extends React.Component {
  render() {
    const {visible} = this.props;
    return (
      <Overlay
        isVisible={visible}
        width={'0%'}
        height={'0%'}
        overlayStyle={{backgroundColor: 'transparent', elevation: 0}}
      />
    );
  }
}
