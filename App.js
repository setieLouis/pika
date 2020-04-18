import React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PaperContainer from './components/PaperContainer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Overlay} from 'react-native-elements';

const adderTop = Math.floor((Dimensions.get('window').height * 85) / 100);
const adderRight = Math.floor((Dimensions.get('window').width * 82) / 100);
const overlayWdth = Math.floor((Dimensions.get('window').width * 90) / 100);
const overlayHgth = Math.floor((Dimensions.get('window').height * 90) / 100);

const ICONS_NAME = [
  'ambulance',
  'baby-carriage',
  'baseball-ball',
  'award',
  'bath',
  'bed',
  'beer',
  'bicycle',
  'birthday-cake',
  'blind',
  'book',
  'bong',
  'book-reader',
  'bread-slice',
  'briefcase',
  'briefcase-medical',
  'bus',
  'camera-retro',
  'capsules',
  'candy-cane',
  'car',
  'carrot',
  'cart-plus',
  'charging-station',
  'chess-rook',
  'child',
  'clinic-medical',
  'cloud-rain',
  'coffee',
  'cocktail',
  'concierge-bell',
  'crow',
  'desktop',
  'female',
  'football-ball',
  'gas-pump',
  'gamepad',
  'futbol',
  'gem',
  'glass-whiskey',
  'glasses',
  'glass-cheers',
  'glass-whiskey',
  'hand-holding',
  'hand-holding-heart',
  'hand-holding-usd',
  'heart',
  'headphones-alt',
  'hiking',
  'hospital',
  'ice-cream',
  'home',
  'laptop',
  'male',
  'money-bill-wave',
  'music',
  'motorcycle',
  'mobile-alt',
  'mitten',
  'plane',
  'prescription-bottle',
  'smoking',
  'socks',
  'swimmer',
  'taxi',
  'table-tennis',
  'subway',
  'tooth',
  'tools',
  'truck-moving',
  'tv',
  'volleyball-ball',
  'utensils',
  'guitar',
  'motorcycle',
  'paperclip',
];

export default class App extends React.Component {
  state = {
    visible: false,
  };
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

        <Overlay
          showsHorizontalScrollIndicator={false}
          isVisible={this.state.showDialog}
          width={overlayWdth}
          height={overlayHgth}
          borderRadius={5}
          overlayStyle={{}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            numColumns={6}
            data={ICONS_NAME}
            renderItem={obj => (
              <TouchableOpacity
                onPress={() => this._createTag(obj)}
                style={{
                  margin: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  width: 55,
                }}>
                <Icon name={obj.item} size={30} color={'#000'} />
              </TouchableOpacity>
            )} //... toString() since it accepts string elements
            keyExtractor={(item, index) => index.toString()}
          />
        </Overlay>
      </View>
    );
  }

  _createTag(obj) {
    this._hideDialog();
    this._addTag(obj)
    console.log(obj);
  }
}
/**




 **/
