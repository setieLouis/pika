import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TextPut from './TextPut';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconPut from './IconPut';
import IconOverlay from './IconOverlay';
import {connect} from 'react-redux';
import {saveTag, tagModel} from './database/Paperbase';

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
      <View style={{flex: 1, marginTop: 50}}>
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

    let actionType = this.state.tagId === -1 ? 'ADD_NEW_TAGS' : 'UPDATE_TAG';
    // Redux pero unitile
    const action = {
      type: actionType,
      value: {
        tag: this.state.tagName,
        icon: this.state.icon,
        id: this.state.tagId,
      },
    };
    this.props.dispatch(action);
    this.props.navigation.navigate('welcome');
  }
}

const mapStateToProps = state => {
  return {
    tags: state.tags,
  };
};

export default connect(mapStateToProps)(TagCreation);
