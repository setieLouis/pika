import React from 'react';
import {Dimensions, FlatList, TouchableOpacity, View, Text} from 'react-native';
import PaperContainer from './PaperContainer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {findAllBlock, findAllMeta, findAllTag} from './database/Paperbase';

const adderTop = Math.floor((Dimensions.get('window').height * 80) / 100);
const adderRight = Math.floor((Dimensions.get('window').width * 82) / 100);
class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.list = [];
    super(props);
  }

  render() {
    const tags = findAllTag();
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={tags}
          renderItem={obj => (
            <PaperContainer
              tag={obj.item}
              ListerAction={this._switcherLister}
            />
          )} //... toString() since it accepts string elements
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity
          onPress={() => this._switcherOne()} /**this._showDialog()}**/
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#4b99f2',
            width: 60,
            height: 60,
            borderRadius: 3,
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

            elevation: 5,
          }}>
          <Icon name={'plus'} size={30} color={'#fff'} />
        </TouchableOpacity>
      </View>
    );
  }

  _switcherOne = () => {
    this.props.navigation.navigate('Tag');
  };

  _switcherLister = id => {
    this.props.navigation.navigate('Lister', {tag: id});
  };

  componentDidMount(): void {
    this.list = findAllMeta();
  }
}

const mapStateToProps = state => {
  return {
    tags: state.tags,
  };
};

export default connect(mapStateToProps)(Welcome);
