import React from 'react';
import {Animated, Easing} from 'react-native';

export default class HeaderFadAnim extends React.Component {
  constructor(props) {
    super(props);
    this.focusTag = undefined;
    this.headerBtn = new Animated.Value(0);
    this.state = {
      headerBtnIndex: 0,
    };
  }

  render() {
    const {show} = this.props;
    this._showHeaderLeftBtn(show);
    return (
      <Animated.View
        style={[
          {
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            width: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: this.state.headerBtnIndex,
            opacity: this.headerBtn,

            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 20,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 5,
          },
        ]}>
        {this.props.children}
      </Animated.View>
    );
  }

  _showHeaderLeftBtn = (show, tag) => {
    if (!show) {
      return;
      if (this.focusTag) {
        console.log('already take');
      }
      this.focusTag = tag;

      Animated.timing(this.headerBtn, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear(),
        useNativeDriver: false,
      }).start();
    }else{

    }
  };
}
