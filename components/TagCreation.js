import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TextPut from './TextPut';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconPut from './IconPut';
import IconOverlay from './IconOverlay';
import {connect} from 'react-redux';
import {saveTag, tagId, tagModel} from './database/Paperbase';
import AntIcon from 'react-native-vector-icons/AntDesign';

class TagCreation extends React.Component {
  _showDialog = () => this.setState({showDialog: true});

  _hideDialog = () => this.setState({showDialog: false});

  constructor(props) {
    super(props);
    const tag = this.props.route.params.tag
      ? this.props.route.params.tag
      : {icon: 'cocktail', id: -1, tag: ''};

    this.state = {
      showDialog: false,
      icon: tag.icon,
      tagName: tag.tag,
      tagId: tag.id,
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',
            backgroundColor: '#fff',
            height: 70,
            width: '100%',

            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 2,

            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 20,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 5,
          }}>
          <TouchableOpacity
            style={{marginLeft: 15}}
            onPress={() => this.props.navigation.goBack()}>
            <AntIcon name={'arrowleft'} size={30} color={'#000'} />
          </TouchableOpacity>
          <Text
            style={{
              width:'80%',
              fontSize: 20,
              fontFamily: 'NanumGothic-Regular',
              textAlign: 'center',
              color: '#000',
            }}>Create a folder</Text>

        </View>
        <View style={{flex: 1, marginTop: 100}}>
          <TextPut
            label={'Nickname'}
            placeholder={'some placeholder'}
            content={{value: this.state.tagName}}
            inputValue={this._tagName}
          />
          <IconPut
            label={'Icon'}
            rightCmp={this._getArrow()}
            content={this.state.icon}
            rightCmpAction={this._showDialog}
          />
          <IconOverlay visible={this.state.showDialog} icon={this._icon} />

          <TouchableOpacity
            onPress={() => this._createTags()}
            style={{
              backgroundColor: '#000',
              padding: 10,
            }}>
            <Text style={{color: '#fff', textAlign: 'center'}}>Ciao</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _getArrow() {
    return <Icon name={'caret-down'} size={30} color={'#000'} />;
  }

  _tagName = text => {
    this.setState({
      tagName: text,
    });
  };

  _icon = obj => {
    this._hideDialog();
    this.setState({
      icon: obj.item,
    });
  };

  _createTags() {
    //SAVE ON DATABASE
    let id = this.state.tagId;
    let actionType = 'UPDATE_TAG';
    if (id === -1) {
      id = tagId();
      actionType = 'ADD_NEW_TAGS';
    }

    // Redux pero unitile
    const action = {
      type: actionType,
      value: {
        tag: this.state.tagName,
        icon: this.state.icon,
        id: id,
      },
    };
    this.props.dispatch(action);
    this.props.navigation.navigate('welcome');
    saveTag(tagModel(this.state.tagName, this.state.icon, id));
  }
}

const mapStateToProps = state => {
  return {
    tags: state.tags,
  };
};

export default connect(mapStateToProps)(TagCreation);
