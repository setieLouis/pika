import React from 'react';
import {Dimensions, FlatList, TouchableOpacity, View} from 'react-native';
import PaperContainer from './PaperContainer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconOverlay from './IconOverlay';



const adderTop = Math.floor((Dimensions.get('window').height * 80) / 100);
const adderRight = Math.floor((Dimensions.get('window').width * 82) / 100);
export default class Welcome extends React.Component {
  _showDialog = () => this.setState({showDialog: true});

  _hideDialog = () => this.setState({showDialog: false});

  _addTag = tag => {
    let tmp = this.state.tag;
    tmp.push(tag);
    this.setState({
      tag: tmp,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      tag: [],
    };
  }
  render() {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.tag}
          renderItem={obj => (
            <PaperContainer name={obj.item.item} color={'#5295bf'} />
          )} //... toString() since it accepts string elements
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity
          onPress={() => this._showDialog()}
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
        <IconOverlay
          visible={this.state.showDialog}
          createTag={this._createTag}
        />
      </View>
    );
  }

  _createTag = obj => {
    this._hideDialog();
    this._addTag(obj);
    console.log(obj);
  };
}
