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

import {connect} from 'react-redux';
import {findAllTag, deleteTag, tagModel, saveTag} from './database/Paperbase';
import TextPut from './TextPut';
import OverlayIconRender from './OverlayIconRender';

const adderTop = Dimensions.get('window').height - 80;
const adderRight = Dimensions.get('window').width - 80;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.folderIconName = undefined;
    this.state = {
      folders: findAllTag(),
      mainBodyBackground: '#f1f3f4',
      headerBtn: new Animated.Value(0),
      headerBtnIndex: 0,
      folderTitleOverlay: false,

      // Overlay statee
      showFolderName: false,
      iconContainerPos: new Animated.Value(width),
      nameContainerPos: new Animated.Value(0),
      overlayContianerOp: new Animated.Value(0),
      overlayContianerInd: -1,
      shadowElevation: 5,
    };
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: this.state.mainBodyBackground}}>
        {/**

           ===============================
           =       HEADER WRAPPER        =
           ===============================

         **/}
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
          {/**

             ===============================
             =         MAIN HEADER         =
             ===============================

             **/}
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
          {/**

             ===============================
             =    UPDATE FOLDER HEADER     =
             ===============================

           **/}
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
                this._hideHeaderLeftBtn();
                this._resetSelected();
              }}>
              <AntIcon name={'close'} size={30} color={'#0384fc'} />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', marginRight: 15}}>
              <TouchableOpacity
                style={{margin: 5}}
                onPress={this._headerUpdateTagAction}>
                <AntIcon name={'form'} size={25} color={'#0384fc'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{margin: 5}}
                onPress={this._deleteFolder}>
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
          data={this.state.folders}
          renderItem={obj => {
            return (
              <PaperContainer
                idCurr={this.selected == undefined ? -1 : this.selected.id}
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
            borderWidth: 1,
            borderColor: 'rgba(218,225,231,0.75)',
            position: 'absolute',
            left: adderRight,
            top: adderTop,
            shadowColor: '#000',
            shadowOffset: {
              width: 10,
              height: 20,
            },
            shadowOpacity: 1,
            shadowRadius: 2.22,
            elevation: this.state.shadowElevation,
          }}>
          <Icon name={'plus'} size={30} color={'#5588a3'} />
        </TouchableOpacity>
        <View
          style={{width, height, position: 'absolute', backgroundColor: '000'}}
        />
        {/**

           ===============================
           =   CREATE FOLDER  OVERLAY    =
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
              addFolderOverlay(this.state.folderName, this._setFolderName),
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

                this._saveFolder(this.folder);
                this._hideOverlayContainer();
              },
              () => this._hideOverlayContainer,
            )}
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
  /**
 *******************************
        HIDE SHOW METHOD
 *******************************
**/

  /**
 =    UPDATE FOLDER HEADER    =
 **/
  _showHeaderLeftBtn = tag => {
    this.selected = tag;
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

  /**
    =   CREATE FOLDER  OVERLAY    =
    **/

  _showoverlayContainer = () => {
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
    this._resetSelected();
    Keyboard.dismiss();
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

  /**
     *******************************
     HEADER BTN ACTION
     *******************************
     **/

  /**
     =   UPDATE FOLDER    =
     **/

  _headerUpdateTagAction = () => {
    this._hideHeaderLeftBtn();
    this.folder = this.selected;
    this.setState(
      {
        folderName: this.folder.tag,
        overlayCurrIconId: this.folder.icon,
      },
      this._showoverlayContainer(),
    );
  };

  _deleteFolder = () => {
    this.setState(
      {
        folders: this.state.folders.filter(f => f.id !== this.selected.id),
      },
      () => {
        deleteTag(this.selected);
        this._resetSelected();
        this._hideHeaderLeftBtn();
      },
    );
  };

  _createFolder() {
    this.folder = {id: -1, tag: '', icon: 'cocktail'};
    this.folderIconName = undefined;
    this._showoverlayContainer();
  }

  /**
     *******************************
     CREATE FOLDER OVERLAY  Action
     *******************************
   **/

  /** save folder on view and on database **/
  _saveFolder = folder => {
    const currfolder = tagModel(folder.tag, folder.icon, folder.id);

    // update change on view
    let tmpFolder = this.state.folders;
    if (this.folder.id !== -1) {
      tmpFolder = tmpFolder.filter(f => f.id !== this.folder.id);
    }
    this.setState(
      {
        folders: [...tmpFolder, currfolder],
      },
      () => {
        this._resetSelected();
        // save update on database
        saveTag(currfolder);
      },
    );
  };

  _resetSelected() {
    this.selected = {id: -1};
  }

  /** get set the folder name on state variable **/
  _setFolderName = text => {
    this.setState({
      folderName: text,
    });
  };

  /** overlay btn icon Action **/
  _folderNameAction = () => {
    Keyboard.dismiss();
    const timeOut = setTimeout(() => {
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
      clearTimeout(clearTimeout);
    }, 800);

    const name =
      this.state.folderName === undefined || this.state.folderName === ''
        ? 'untitle folder'
        : this.state.folderName;

    this.folder = {icon: this.folder.icon, id: this.folder.id, tag: name};
  };

  /** Icon View previous Action **/
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

  /**
     *******************************
     SWITCH ON ANOTHER VIEW
     *******************************
     **/
  /** move to paper list View **/
  _switcherLister = (id, nome) => {
    this.props.navigation.navigate('paperLister', {tag: id, nome: nome});
  };
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

/**
 *******************************
 CREATE FOLDER OVERLAY  VIEW
 *******************************
 **/

/** folder name input view **/
function addFolderOverlay(folderName, setFolderName) {
  return (
    <TextPut
      label={'Create Folder'}
      placeholder={'Folder name'}
      content={folderName}
      inputValue={setFolderName}
    />
  );
}

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
