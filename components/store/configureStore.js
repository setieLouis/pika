// Store/configureStore.js

import {createStore, combineReducers} from 'redux';
import toggleFavorite from './reducers/routeReducer';

export default createStore(toggleFavorite);
