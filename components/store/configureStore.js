// Store/configureStore.js

import {createStore} from 'redux';
import toggleFavorite from './reducers/tagReducer';

export default createStore(toggleFavorite);
