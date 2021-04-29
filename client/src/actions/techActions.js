import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR,
} from './types';
import axios from 'axios';

//get techs from server
export const getTechs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.get('/api/techs');

    dispatch({
      type: GET_TECHS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err,
    });
  }
};

//add techs
export const addTech = (tech) => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.post('/api/techs', tech);

    dispatch({
      type: ADD_TECH,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err,
    });
  }
};

//Delete techs from server
export const deleteTech = (id) => async (dispatch) => {
  try {
    setLoading();

    await axios.delete(`/api/techs/${id}`);

    dispatch({
      type: DELETE_TECH,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err,
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
