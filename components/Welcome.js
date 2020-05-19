import React from 'react';
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Animated,
  Easing,
  Keyboard,
} from 'react-native';
import PaperContainer from './PaperContainer';
import ICONS from './static/ICONS';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Aws5Icon from 'react-native-vector-icons/FontAwesome5';

import {connect} from 'react-redux';
import {
  findAllTag,
  deleteTag,
  tagId,
  saveTag,
  tagModel,
} from './database/Paperbase';
import IconOverlay from './IconOverlay';
import TextPut from './TextPut';
import OverlayIconRender from './OverlayIconRender';
import EmptyOverlay from './EmptyOverlay';

const adderTop = Dimensions.get('window').height - 80;
const adderRight = Dimensions.get('window').width - 80;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const overlayWidth = Math.floor((width * 90) / 100);

const blockWidth = (width - 20) / 2;
class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.folderIconName = undefined;
    this.state = {
      mainBodyBackground: '#f1f3f4',
      headerBtn: new Animated.Value(0),
      headerBtnIndex: 0,
      folderTitleOverlay: false,

      // Overlay statee
      showFolderName: false,
      showIconOveralay: false,
      iconContainerPos: new Animated.Value(width),
      nameContainerPos: new Animated.Value(0),
      overlayContianerOp: new Animated.Value(0),
      overlayContianerInd: -1,
      shadowElevation: 5,
    };

    this._addTagList(findAllTag());
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: this.state.mainBodyBackground}}>
        <View
          style={{
            backgroundColor: '#000',
            height: 60,
            width: '100%',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 20,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: this.state.shadowElevation,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: '#fff',
              height: 60,
              width: '100%',
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 0,
            }}>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 25,
                fontFamily: 'IBMPlexSerif-SemiBold',
                fontWeight: '500',
                textAlign: 'left',
                color: '#000',
              }}>
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
              onPress={() => {
                this.folder = {id: -1};
                this._cancelHeaderBtn();
              }}>
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

        {/**

           ===============================
           =          FOLDER LIST        =
           ===============================

           **/}

        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.props.tags}
          renderItem={obj => {
            return (
              <PaperContainer
                idCurr={this.folder == undefined ? -1 : this.folder.id}
                tag={obj.item}
                pressAction={this._switcherLister}
                longPressAction={this._showHeaderLeftBtn}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />

        {/**

           ===============================
           =      CREATE FOLDER BTN      =
           ===============================

           **/}
        <TouchableOpacity
          onPress={() => this._createFolder()}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            width: 60,
            height: 60,
            borderRadius: 30,
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
            elevation: this.state.shadowElevation,
          }}>
          <Icon name={'plus'} size={30} color={'#0384fc'} />
        </TouchableOpacity>
        <View
          style={{width, height, position: 'absolute', backgroundColor: '000'}}
        />

        {/**

           ===============================
           =       CREATE FOLDER         =
           ===============================

          **/}

        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            flexDirection: 'row',
            alignItems: 'center',

            opacity: this.state.overlayContianerOp,
            zIndex: this.state.overlayContianerInd,
          }}>
          <Animated.View
            style={{position: 'absolute', left: this.state.nameContainerPos}}>
            {overlayBodyContaner(
              200,
              this._AddFolderOverlay(
                this.folder === undefined ? '' : this.folder.tag,
              ),
              'Icon',
              undefined,
              undefined,
              this._folderNameAction,
              () => this._hideOverlayContainer,
            )}
          </Animated.View>
          <Animated.View
            style={{position: 'absolute', left: this.state.iconContainerPos}}>
            {overlayBodyContaner(
              400,
              this._overLayIconBody(),
              'Create',
              'Previous',
              this._overlayPreviousaction,
              () => {
                // Save all data
                const name =
                  this.folderIconName === undefined ||
                  this.folderIconName === ''
                    ? 'cocktail'
                    : this.folderIconName;
                this.folder = {...this.folder, icon: name};

                this._hideOverlayContainer();
                this._saveFolder(this.folder);
              },
              () => this._hideOverlayContainer,
            )}
          </Animated.View>
        </Animated.View>

        {/**
           ===============================
           =        EMPTY OVERLAY        =
           ===============================
          **/}
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
    this.folder = tag;
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

  _switcherOne = tag => {
    if (this.folder) {
      return;
    }
    // this._showFolderOveraly();
    //this.props.navigation.navigate('create_tag', {tag: tag});
  };

  _switcherLister = (id, nome) => {
    if (this.folder) {
      return;
    }
    this.props.navigation.navigate('Lister', {tag: id, nome: nome});
  };

  _deleteTag = () => {
    const action = {
      type: 'DELETE_TAG',
      value: this.folder,
    };
    this.props.dispatch(action);
    deleteTag(this.focusTag);
    this._hideHeaderLeftBtn();
  };

  _cancelHeaderBtn = () => {
    this._hideHeaderLeftBtn();
  };

  /**
     ==================================
     ======= Overlay function =========
     ==================================
     **/
  _showoverlayContainer = () => {
    //console.log('=================');
    this.setState(
      {
        overlayCurrIconId: -1,
        overlayContianerInd: 1,
        shadowElevation: 0,
      },
      () => {
        Animated.timing(this.state.overlayContianerOp, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear(),
          useNativeDriver: false,
        }).start();
      },
    );
  };

  _hideOverlayContainer = () => {
    //console.log('=================');
    Keyboard.dismiss();
    this.folder = {id: -1};
    this.setState(
      {
        shadowElevation: 5,
        folderName: undefined,
        overlayCurrIconId: -1,
      },
      () => {
        Animated.timing(this.state.overlayContianerOp, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear(),
          useNativeDriver: false,
        }).start(() => {
          this.setState({
            overlayContianerInd: -1,
            iconContainerPos: new Animated.Value(width),
            nameContainerPos: new Animated.Value(0),
          });
        });
      },
    );
  };

  _headerUpdateTagAction = () => {
    this._hideHeaderLeftBtn();
    this.setState(
      {
        folderName: this.folder.tag,
        overlayCurrIconId: this.folder.icon,
      },
      this._showoverlayContainer(),
    );
  };

  _createFolder() {
    this.folder = {id: -1, tag: '', icon: 'cocktail'};
    this.folderIconName = undefined;
    this._showoverlayContainer();
  }

  _saveFolder = folder => {
    //SAVE ON DATABASE
    let id = folder.id;
    let actionType = 'UPDATE_TAG';
    if (id === -1) {
      id = tagId();
      actionType = 'ADD_NEW_TAGS';
    }
    console.log('======== check ============');
    console.log(this.folder);

    saveTag(tagModel(folder.tag, folder.icon, folder.id));

    // Redux pero unitile
    /*const action = {
          type: actionType,
          value: folder,
        };
        this.props.dispatch(action);
        this.props.navigation.navigate('welcome');*/
  };

  _hideFolderOveraly = () => {
    this.setState(
      {
        showFolderName: false,
      },
      this._showIconOveraly(),
    );
  };

  _showIconOveraly() {
    this.setState({
      showIconOveralay: true,
    });
  }

  _hideIconOveraly = () => {
    this.setState({
      showIconOveralay: false,
    });
  };

  _AddFolderOverlay(content) {
    return (
      <TextPut
        label={'Create Folder'}
        placeholder={'Folder name'}
        content={this.state.folderName}
        inputValue={this._setFolderName}
      />
    );
  }

  _overLayIconBody() {
    return (
      <FlatList
        numColumns={3}
        data={ICONS}
        renderItem={obj => (
          <OverlayIconRender
            element={obj}
            value={this.state.overlayCurrIconId}
            action={() => {
              this.folderIconName = obj.item;
              this.setState({
                overlayCurrIconId: obj.item,
              });
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }

  _setFolderName = text => {
    this.setState({
      folderName: text,
    });
  };

  _folderNameAction = () => {
    Keyboard.dismiss();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(this.state.nameContainerPos, {
          toValue: -400,
          duration: 500,
          easing: Easing.linear(),
          useNativeDriver: false,
        }),
        Animated.timing(this.state.iconContainerPos, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear(),
          useNativeDriver: false,
        }),
      ]).start(() => {});
    }, 800);

    const name =
      this.state.folderName === undefined || this.state.folderName === ''
        ? 'untitle folder'
        : this.state.folderName;
    console.log('======= FIRST ==========');
    console.log(this.folder);

    this.folder = {icon: this.folder.icon, id: this.folder.id, tag: name};

    console.log('======= AFTER ==========');
    console.log(this.folder);
    console.log('======= END ==========');
  };

  _overlayPreviousaction = () => {
    Animated.parallel([
      Animated.timing(this.state.nameContainerPos, {
        toValue: 0,

        duration: 500,
        easing: Easing.linear(),
        useNativeDriver: false,
      }),
      Animated.timing(this.state.iconContainerPos, {
        toValue: width,
        duration: 500,
        easing: Easing.linear(),
        useNativeDriver: false,
      }),
    ]).start();
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

const overlayWdth = Math.floor((Dimensions.get('window').width * 85) / 100);
const overlayHgth = Math.floor((Dimensions.get('window').height * 90) / 100);
const marginLeft = (overlayWdth - 320) / 2;

function overlayBodyContaner(
  height,
  content,
  mainTitle,
  previous,
  previousAction,
  mainAction,
  closeAction,
) {
  const marginLeft = Math.floor((width - overlayWdth) / 2);
  return (
    <View
      style={{
        width: overlayWdth,
        borderRadius: 15,
        height: height,
        marginLeft,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 15,
      }}>
      {content}
      {OverlayBtn(
        'Cancel',
        previous,
        mainTitle,
        previousAction,
        mainAction,
        closeAction,
      )}
    </View>
  );
}
function OverlayBtn(
  close,
  previous,
  main,
  previousAction,
  mainAction,
  closeAction,
) {
  const prev = previous ? (
    <TouchableOpacity onPress={() => previousAction()}>
      <Text
        style={{
          margin: 15,
          color: '#1089ff',
          fontFamily: 'BrandonGrotesque-Medium',
          fontSize: 18,
        }}>
        {previous}
      </Text>
    </TouchableOpacity>
  ) : (
    <View />
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
      }}>
      <TouchableOpacity onPress={closeAction()}>
        <Text
          style={{
            margin: 15,
            color: '#1089ff',
            fontFamily: 'BrandonGrotesque-Medium',
            fontSize: 18,
          }}>
          {close}
        </Text>
      </TouchableOpacity>
      {prev}
      <TouchableOpacity onPress={() => mainAction()}>
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
    </View>
  );
}
