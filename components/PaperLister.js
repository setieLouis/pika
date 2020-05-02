import React from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import {getPaperList} from './caller/PaperCaller';
import {ListItem} from 'react-native-elements';

export default class PaperLister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: {
        papers: [],
      },
    };
  }
  render() {
    return (

      <FlatList
        showsVerticalScrollIndicator={false}
        data={this.state.tag.papers}
        renderItem={(obj, index) => (
          <TouchableOpacity onPress={() => this._switcherPaper(obj.item)}>
            <ListItem
              title={obj.item.nome}
              subtitle={obj.item.indirizzo}
              rightTitle={obj.item.data}
              rightSubtitle={''}
              bottomDivider
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    );
  }

  _switcherPaper = paper => {
    this.props.navigation.navigate('paper', {
      tagId: this.state.tag.tag,
      paper_meta: paper,
    });
  };

  componentDidMount(): void {
    console.log();
    this.setState({
      tag: getPaperList(this.props.route.params.tag.name),
    });
  }
}
