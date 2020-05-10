import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import {
  deleteInfo,
  findAllInfo,
  findAllTag,
  findMetaByTagId,
} from './database/Paperbase';
import {formatDate} from './Utility';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import MatCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';

class PaperLister extends React.Component {
  constructor(props) {
    super(props);
    this.infoCpy = undefined;
    this.focusMeta = undefined;
    this.state = {
      metaHeaderBtn: new Animated.Value(0),
      metaHeaderBtnIndex: 0,
      searchHeaderBtn: new Animated.Value(0),
      searchHeaderBtnIndex: 0,
      infos: findMetaByTagId(this.props.route.params.tag),
    };
    this._addInfoList(findAllInfo());
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
              <TouchableOpacity
                style={{margin: 5}}
                onPress={() => this.props.navigation.goBack()}>
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
              <TouchableOpacity
                style={{margin: 5}}
                onPress={() => this.props.navigation.goBack()}>
                <MatIcon name={'arrow-back'} size={30} color={'#fff'} />
              </TouchableOpacity>
              <Text style={{fontSize: 25, textAlign: 'left'}}>Nome tag</Text>
            </View>
            <TouchableOpacity
              style={{margin: 5}}
              onPress={this._showSearchHeaderBtn}>
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
          <Animated.View
            style={[
              {
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: '#3486eb',
                width: '100%',
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: this.state.searchHeaderBtnIndex,
                opacity: this.state.searchHeaderBtn,
              },
            ]}>
            <TouchableOpacity
              style={{margin: 5}}
              onPress={this._cancelInfoSearch}>
              <MatIcon name={'arrow-back'} size={30} color={'#fff'} />
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                onChangeText={text => this._filtra(text)}
                style={{width: 300, marginLeft: 20, backgroundColor: '#fff'}}
                placeholder={'Search...'}
              />
            </View>
          </Animated.View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.infos}
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
    if (this.focusMeta || this.infoCpy) {
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

  _showSearchHeaderBtn = meta => {
    console.log(this.infoCpy, this.focusMeta)
    if (this.focusMeta || this.infoCpy) {
      return;
    }
    this.infoCpy = [];
    this.setState({searchHeaderBtnIndex: 2}, () => {
      Animated.timing(this.state.searchHeaderBtn, {
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

  _hideSearchHeaderBtn = () => {
    Animated.timing(this.state.searchHeaderBtn, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear(),
      useNativeDriver: false,
    }).start(() => {
      this.setState({
        searchHeaderBtnIndex: 0,
      });
    });
  };

  _cancelInfoSearch = () => {
    this._hideSearchHeaderBtn();
    this.setState(
      {
        infos: (this.infoCpy.length > 0)? this.infoCpy :this.state.infos,
      },
      () => {
        this.infoCpy = undefined

      },
    );
  };

  _deleteInfo = () => {
    /*const action = {
      type: 'DELETE_INFO',
      value: this.focusMeta,
    };
    this.props.dispatch(action);*/

    deleteInfo(this.focusMeta);
    this._cancelMetaBtn();
  };

  _cancelMetaBtn = () => {
    this._hideInfoHeaderBtn();
    this.focusMeta = undefined;
  };
  _switcherPaper = id => {
    if (this.focusMeta) {
        return;
    }

    if(this.infoCpy){
      this._cancelInfoSearch();
    }
    this.props.navigation.navigate('paper', {info: id});
  };

  _filtra(text) {
    this.infoCpy = this.infoCpy.length > 0 ? this.infoCpy : this.state.infos;
    let tofilter =
      this.state.infos.length > 0 ? this.state.infos : this.infoCpy;

    let list = tofilter.filter(
      el => el.indirizzo.includes(text) || el.negozio.includes(text),
    );
    list = (text.length > 0)? list : this.infoCpy;
    this.setState({
      infos: list,
    });
  }

  componentDidMount(): void {
    this.setState({
      infos: this.props.infos,
    });
  }
}
const mapStateToProps = state => {
  return {
    deleteInfos: state.paper.info.deleteInfos,
    infos: state.paper.info.infos,
  };
};

export default connect(mapStateToProps)(PaperLister);
