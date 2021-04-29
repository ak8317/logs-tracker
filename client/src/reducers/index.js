import { combineReducers } from 'redux';
import logRedducer from './logReducer';
import techReducer from './techReducer';
export default combineReducers({
  log: logRedducer,
  tech: techReducer,
});
