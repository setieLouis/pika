import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {deleteInfo, findAllInfo, findAllTag, findMetaByTagId} from './database/Paperbase';
import {formatDate} from './Utility';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import MatCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';

class PaperLister extends React.Component {
  constructor(props) {
    super(props);
    this.blocks = [];
    this.focusMeta = undefined;
    this.state = {
      metaHeaderBtn: new Animated.Value(0),
      metaHeaderBtnIndex: 0,
    };
    this._addInfoList(findAllInfo());
  }

  render() {
    const list = findMetaByTagId(this.props.route.params.tag); //JSON.parse(this.props.route.params.list);
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
              justifyContent: 'space-between',
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
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{margin: 5}} onPress={() => this.props.navigation.goBack()}>
                <MatIcon name={'arrow-back'} size={30} color={'#fff'} />
              </TouchableOpacity>
              <Text style={{fontSize: 25, textAlign: 'left'}}>Nome tag</Text>
            </View>
            <TouchableOpacity
              style={{margin: 5}}
              onPress={this._headerUpdateTagAction}>
              <MatIcon name={'search'} size={30} color={'#fff'} />
            </TouchableOpacity>
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
                zIndex: this.state.metaHeaderBtnIndex,
                opacity: this.state.metaHeaderBtn,
              },
            ]}>
            <TouchableOpacity style={{margin: 5}} onPress={this._cancelMetaBtn}>
              <MatIcon name={'arrow-back'} size={30} color={'#fff'} />
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{margin: 5}} onPress={this._deleteInfo}>
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
          data={list}
          renderItem={(obj, index) => {
            return (
              <TouchableOpacity
                onPress={() => this._switcherPaper(obj.item.id)}
                onLongPress={() => this._showInfoHeaderBtn(obj.item)}>
                <ListItem
                  title={obj.item.negozio}
                  subtitle={obj.item.indirizzo}
                  rightTitle={formatDate(obj.item.data)}
                  rightSubtitle={''}
                  bottomDivider
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
  _addInfoList = infos => {
    const action = {
      type: 'ADD_INFO_LIST',
      value: infos,
    };
    this.props.dispatch(action);
  };

  _showInfoHeaderBtn = meta => {
    if (this.focusMeta) {
      return;
    }
    this.focusMeta = meta;
    this.setState({metaHeaderBtnIndex: 2}, () => {
      Animated.timing(this.state.metaHeaderBtn, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear(),
        useNativeDriver: false,
      }).start();
    });
  };

  _hideInfoHeaderBtn = () => {
    Animated.timing(this.state.metaHeaderBtn, {
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

  _deleteInfo = () => {
    const action = {
      type: 'DELETE_INFO',
      value: this.focusMeta,
    };
    this.props.dispatch(action);
    deleteInfo(this.focusMeta);
    this.focusMeta = undefined;
    this._hideInfoHeaderBtn();
  };

  _cancelMetaBtn = () => {
    this._hideInfoHeaderBtn();
    this.focusMeta = undefined;
  };
  _switcherPaper = id => {
    if(this.focusMeta) return;
    this.props.navigation.navigate('paper', {info: id});
  };
}
const mapStateToProps = state => {
  return {
    deleteInfos: state.paper.info.deleteInfos,
    infos: state.paper.info.infos,
  };
};

export default connect(mapStateToProps)(PaperLister);
