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

    this.state = {
      showDialog: false,
      icon: 'cocktail',
      tagName: '',
    };
  }

  render() {
    return (
      <View style={{flex: 1, marginTop: 50}}>
        <TextPut
          label={'Nickname'}
          placeholder={'nome.cognome'}
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
    saveTag(tagModel(this.state.tagName, this.state.icon));

    const action = {
      type: 'ADD',
      value: {
        name: this.state.tagName,
        icon: this.state.icon,
      },
    };
    this.props.dispatch(action);
    this.props.navigation.navigate('Home');
  }
}

const mapStateToProps = state => {
  return {
    tags: state.tags,
  };
};

export default connect(mapStateToProps)(TagCreation);
