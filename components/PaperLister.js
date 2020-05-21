import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import ListItem from './ListItem';
import {deleteInfo, findAllInfo, findMetaByTagId} from './database/Paperbase';

import AntIcon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {set} from 'react-native-reanimated';

const width = Dimensions.get('window').width;
const ottPerCent = Math.floor((Dimensions.get('window').width * 80) / 100);

class PaperLister extends React.Component {
  constructor(props) {
    super(props);

    this.infoCpy = undefined;
    this.selected = {id: -1};
    this.state = {
      metaHeaderBtn: new Animated.Value(0),
      metaHeaderBtnIndex: 0,
      searchHeaderBtn: new Animated.Value(0),
      searchHeaderBtnIndex: 0,
      infos: [],
    };

    console.log('===================');
    //console.log(this.state.infos);
    console.log('===================');

    //this._addInfoList(findAllInfo());
  }

  render() {
    console.log(this.state.infos.length);
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            backgroundColor: '#000',
            height: 70,
            width: '100%',
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
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fff',
              height: 70,
              width: '100%',
              position: 'absolute',

              left: 0,
              top: 0,
              zIndex: 1,
            }}>
            <TouchableOpacity
              style={{marginLeft: 15}}
              onPress={() => this.props.navigation.goBack()}>
              <AntIcon name={'arrowleft'} size={30} color={'#000'} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'NanumGothic-Regular',
                textAlign: 'left',
                color: '#000',
              }}>
              {this.props.route.params.nome}
            </Text>

            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={this._showSearchHeaderBtn}>
              <AntIcon name={'search1'} size={25} color={'#000'} />
            </TouchableOpacity>
          </View>
          <Animated.View
            style={[
              {
                height: 70,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                width: '100%',
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: this.state.metaHeaderBtnIndex,
                opacity: this.state.metaHeaderBtn,
              },
            ]}>
            <TouchableOpacity
              style={{marginLeft: 15}}
              onPress={this._cancelMetaBtn}>
              <AntIcon name={'close'} size={30} color={'#0384fc'} />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', marginRight: 15}}>
              <TouchableOpacity
                style={{margin: 5}}
                onPress={() => this._deleteInfo()}>
                <AntIcon name={'delete'} size={25} color={'#0384fc'} />
              </TouchableOpacity>
              <TouchableOpacity style={{margin: 5}}>
                <AntIcon name={'sharealt'} size={25} color={'#0384fc'} />
              </TouchableOpacity>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              {
                height: 70,
                width: '100%',

                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: '#fff',

                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: this.state.searchHeaderBtnIndex,
                opacity: this.state.searchHeaderBtn,
              },
            ]}>
            <TouchableOpacity
              style={{marginLeft: 15, backgroundColor: '#fff'}}
              onPress={this._cancelInfoSearch}>
              <AntIcon name={'close'} size={25} color={'#0384fc'} />
            </TouchableOpacity>
            <TextInput
              onChangeText={text => this._filtra(text)}
              style={{width: 320, marginLeft: 10, backgroundColor: '#fff'}}
              placeholder={'Search...'}
            />
          </Animated.View>
        </View>

        <FlatList
          data={this.state.infos}
          renderItem={obj => (
            <ListItem
              onPress={this._switcherPaper}
              onLongPress={this._showInfoHeaderBtn}
              idCurr={this.selected}
              element={obj.item}
            />
          )}
          keyExtractor={(item, index) => item.id}
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
    this.selected = meta;
    this._showPutHeader();
  };

  _showPutHeader() {
    this.setState({metaHeaderBtnIndex: 2}, () => {
      Animated.timing(this.state.metaHeaderBtn, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear(),
        useNativeDriver: false,
      }).start();
    });
  }

  _showSearchHeaderBtn = meta => {
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
        infos: this.infoCpy.length > 0 ? this.infoCpy : this.state.infos,
      },
      () => {
        this.infoCpy = undefined;
      },
    );
  };

  _deleteInfo = () => {
    this.setState({
      infos: this.state.infos.filter(el => el.id !== this.selected.id),
    });

    deleteInfo(this.selected);
    this._cancelMetaBtn();
  };

  _cancelMetaBtn = () => {
    this._hideInfoHeaderBtn();
    this.selected = {id: -1};
  };
  _switcherPaper = (id, negozio) => {
    if (this.infoCpy) {
      this._cancelInfoSearch();
    }
    this.props.navigation.navigate('paper', {info: id, negozio: negozio});
  };

  _filtra(text) {
    this.infoCpy = this.infoCpy.length > 0 ? this.infoCpy : this.state.infos;
    let tofilter =
      this.state.infos.length > 0 ? this.state.infos : this.infoCpy;

    let list = tofilter.filter(
      el => el.indirizzo.includes(text) || el.negozio.includes(text),
    );
    list = text.length > 0 ? list : this.infoCpy;
    this.setState({
      infos: list,
    });
  }

  componentDidMount(): void {
    this.setState({
      infos: findMetaByTagId(this.props.route.params.tag),
    });
  }
}
const mapStateToProps = state => {
  return {
    deleteInfos: state.paper.info.deleteInfos,
    //infos: state.paper.info.infos,
  };
};

export default connect(mapStateToProps)(PaperLister);
