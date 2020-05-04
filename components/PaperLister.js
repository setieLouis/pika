import React from 'react';
import {FlatList, TouchableOpacity, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import {findAllBlock, findMetaByTagId} from './database/Paperbase';
import {formatDate} from './Utility';

export default class PaperLister extends React.Component {
  constructor(props) {
    super(props);
    this.blocks = [];
  }

  render() {
    const list = findMetaByTagId(this.props.route.params.tag); //JSON.parse(this.props.route.params.list);
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={list}
        renderItem={(obj, index) => {
          return (
            <TouchableOpacity onPress={() => this._switcherPaper(obj.item.id)}>
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
    );
  }

  _switcherPaper = id => {
    this.props.navigation.navigate('paper', {info: id});
  };

  componentDidMount(): void {
    this.blocks = findAllBlock(this.props.route.params.block);
  }
}
