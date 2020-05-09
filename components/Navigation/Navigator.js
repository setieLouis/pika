import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../Welcome';
import TagCreation from '../TagCreation';
import PaperLister from '../PaperLister';
import Paper from '../Paper';
import TagHeader from './header/TagHeader';
import {Animated, Easing, Text, TextInput, View} from 'react-native';
import TextPut from '../TextPut';
const Stack = createStackNavigator();

export default class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWidth: new Animated.Value(0),
    };
  }
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{


            headerShown: false,
          }}
          name={'welcome'}
          component={Welcome}
        />
        <Stack.Screen name="Tag" component={TagCreation} />
        <Stack.Screen name="Lister" component={PaperLister} />
        <Stack.Screen name="paper" component={Paper} />
      </Stack.Navigator>
    );
  }
}
/**
 {({route}) => {
           // console.log(route);
            headerTitle: navigation => {
              //console.log(navigation)
              return (
                <View style={{height: '100%'}}>
                  <Text>Ciao</Text>
                </View>
              );
            };
          }}



 style={{height: 80, width: '100%', backgroundColor: '#fff', borderWidth:0}}>
 <TextInput
 placeholder={'Search'}
 placeholderTextColor={'#919291'}
 onChangeText={text => navigation.route.params.search(text)}
 style={{
                      height: '100%',
                      width: '100%',
                      borderColor: 'gray',
                      borderBottomWidth: 1,
                      borderBottomColor: '#bfbfbf',
                      fontSize: 17,
                      paddingRight: 30,
                      paddingLeft: 20,
                      fontFamily: 'BrandonGrotesque-Light',
                      color: '#3D83FE',
                    }}
 **/
