import React from 'react';
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Animated,
  Easing,
} from 'react-native';
import PaperContainer from './PaperContainer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {findAllTag} from './database/Paperbase';

const adderTop = Math.floor((Dimensions.get('window').height * 80) / 100);
const adderRight = Math.floor((Dimensions.get('window').width * 82) / 100);

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusTag: {},
      headerBtn: new Animated.Value(0),
      headerBtnIndex: 0,
    };

    this._addTagList(findAllTag());
  }

  render() {
    console.log();
    return (
      <View>
        <View
          style={{
            backgroundColor: '#000',
            height: 80,
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: '#34eb7a',
              height: 80,
              padding: 10,
              width: '100%',
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 1,
            }}>
            <Text style={{fontSize: 25, textAlign: 'left'}}>Paper</Text>
          </View>
          <Animated.View
            style={[
              {
                height: 80,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                backgroundColor: '#3486eb',
                width: '100%',
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: this.state.headerBtnIndex,
                opacity: this.state.headerBtn,
              },
            ]}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{margin: 5}}
                onPress={this._headerUpdateTagAction}>
                <MatIcon name={'pencil'} size={30} color={'#fff'} />
              </TouchableOpacity>
              <TouchableOpacity style={{margin: 5}}>
                <MatIcon name={'delete'} size={30} color={'#fff'} />
              </TouchableOpacity>
              <TouchableOpacity style={{margin: 5}}>
                <MatIcon name={'share-variant'} size={30} color={'#fff'} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.props.tags}
          renderItem={obj => {
            console.log(obj);
            return (
              <PaperContainer
                tag={obj.item}
                pressAction={this._switcherLister}
                longPressAction={this._showHeaderLeftBtn}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity
          onPress={() => this._switcherOne()}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#4b99f2',
            width: 60,
            height: 60,
            borderRadius: 3,
            position: 'absolute',
            left: adderRight,
            top: adderTop,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 20,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 5,
          }}>
          <Icon name={'plus'} size={30} color={'#fff'} />
        </TouchableOpacity>
      </View>
    );
  }
  _addTagList = tags => {
    const action = {
      type: 'ADD_TAG_LIST',
      value: tags,
    };
    this.props.dispatch(action);
  };
  _showHeaderLeftBtn = tag => {
    console.log(tag);
    this.setState(
      {
        focusTag: tag,
        headerBtnIndex: 2,
      },
      () => {
        console.log(this.state.focusTag);
        Animated.timing(this.state.headerBtn, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear(),
          useNativeDriver: false,
        }).start();
      },
    );
  };
  _hideHeaderLeftBtn = () => {
    Animated.timing(this.state.headerBtn, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear(),
      useNativeDriver: false,
    }).start(() => {
      this.setState({
        headerBtnIndex: 0,
      });
    });
  };

  _headerUpdateTagAction = () => {
    this._switcherOne(this.state.focusTag);
    this._hideHeaderLeftBtn();
  };

  _switcherOne = tag => {
    this.props.navigation.navigate('Tag', {tag: tag});
  };

  _switcherLister = id => {
    this.props.navigation.navigate('Lister', {tag: id});
  };

  componentDidMount(): void {
    this.setState({
      tags: findAllTag(),
    });
  }

  componentDidUpdate(): void {}
}

const mapStateToProps = state => {
  return {
    tags: state.tags,
  };
};

export default connect(mapStateToProps)(Welcome);

