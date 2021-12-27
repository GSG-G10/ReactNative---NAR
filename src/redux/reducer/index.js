import { combineReducers } from 'redux';
import projectsData from './projects';
import setAccessToken from './loginState'

const reducers = combineReducers({projectsData, setAccessToken});

export default reducers;