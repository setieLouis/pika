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
import MatCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
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
      <View>
        <View
          style={{
            backgroundColor: '#000',
            height: 60,
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: '#34eb7a',
              height: 60,
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
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#3486eb',
                width: '100%',
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: this.state.headerBtnIndex,
                opacity: this.state.headerBtn,
              },
            ]}>
            <TouchableOpacity
              style={{margin: 5}}
              onPress={this._cancelHeaderBtn}>
              <MatIcon name={'arrow-back'} size={30} color={'#fff'} />
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{margin: 5}}
                onPress={this._headerUpdateTagAction}>
                <MatCIcon name={'pencil'} size={30} color={'#fff'} />
              </TouchableOpacity>
              <TouchableOpacity style={{margin: 5}} onPress={this._deleteTag}>
                <MatCIcon name={'delete'} size={30} color={'#fff'} />
              </TouchableOpacity>
              <TouchableOpacity style={{margin: 5}}>
                <MatCIcon name={'share-variant'} size={30} color={'#fff'} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>

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
    if (this.focusTag) {
      console.log('already take');
    }
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

  _switcherLister = id => {
    if (this.focusTag) {
      return;
    }
    this.props.navigation.navigate('Lister', {tag: id});
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
