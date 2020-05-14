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
import AntIcon from 'react-native-vector-icons/AntDesign';

import {connect} from 'react-redux';
import {findAllTag, deleteTag} from './database/Paperbase';

const adderTop = Math.floor((Dimensions.get('window').height * 80) / 100);
const adderRight = Math.floor((Dimensions.get('window').width * 82) / 100);

class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.focusTag = undefined;
    this.state = {
      headerBtn: new Animated.Value(0),
      headerBtnIndex: 0,
    };

    this._addTagList(findAllTag());
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        <View
          style={{
            backgroundColor: '#000',
            height: 60,
            width: '100%',
            marginBottom: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 20,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: '#fff',
              height: 60,
              padding: 10,
              width: '100%',
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 1,
            }}>
            <Text style={{fontSize: 25, fontFamily: 'NanumGothic-Regular', fontWeight:'500', textAlign: 'left', color: '#000'}}>
              Paper
            </Text>
          </View>
          <Animated.View
            style={[
              {
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                width: '100%',
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: this.state.headerBtnIndex,
                opacity: this.state.headerBtn,
              },
            ]}>
            <TouchableOpacity
              style={{marginLeft: 15}}
              onPress={this._cancelHeaderBtn}>
              <AntIcon name={'close'} size={30} color={'#0384fc'} />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', marginRight: 15}}>
              <TouchableOpacity
                style={{margin: 5}}
                onPress={this._headerUpdateTagAction}>
                <AntIcon name={'form'} size={25} color={'#0384fc'} />
              </TouchableOpacity>
              <TouchableOpacity style={{margin: 5}} onPress={this._deleteTag}>
                <AntIcon name={'delete'} size={25} color={'#0384fc'} />
              </TouchableOpacity>
              <TouchableOpacity style={{margin: 5}}>
                <AntIcon name={'sharealt'} size={25} color={'#0384fc'} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
        <View style={{width: 340, marginLeft: 10}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={this.props.tags}
            renderItem={obj => {
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
        </View>

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
    this.focusTag = tag;
    this.setState(
      {
        headerBtnIndex: 2,
      },
      () => {
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
    this._switcherOne(this.focusTag);
    this._hideHeaderLeftBtn();
  };

  _switcherOne = tag => {
    if (this.focusTag) {
      return;
    }
    this.props.navigation.navigate('Tag', {tag: tag});
  };

  _switcherLister = (id, nome) => {
    if (this.focusTag) {
      return;
    }
    this.props.navigation.navigate('Lister', {tag: id, nome : nome});
  };

  _deleteTag = () => {
    const action = {
      type: 'DELETE_TAG',
      value: this.focusTag,
    };
    this.props.dispatch(action);
    deleteTag(this.focusTag);
    this.focusTag = undefined;
    this._hideHeaderLeftBtn();
  };

  _cancelHeaderBtn = () => {
    this._hideHeaderLeftBtn();
    this.focusTag = undefined;
  };
}

const mapStateToProps = state => {
  return {
    tags: state.paper.tag.tags,
    updateTags: state.paper.tag.updateTags,
    deleteTags: state.paper.tag.deleteTags,
  };
};

export default connect(mapStateToProps)(Welcome);
