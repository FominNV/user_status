import axios from 'axios';
import {
  FetchStatusDispatch,
  ICity,
  IUniversity,
  StatusActionTypes,
  StatusDispatch,
  URLS
} from "./types";

export const getUniversities: FetchStatusDispatch = () => async (dispatch) => {
  const response = await axios.get(URLS.UNIVERSITY_URL);

  if (!response.status) {
    throw new Error(`Can't get universities :${response.statusText}`);
  }

  dispatch({
    type: StatusActionTypes.GET_UNIVERSITIES,
    payload: { universities: response.data }
  });
};

export const setCurrentUniversity: StatusDispatch<IUniversity> = (
  university
) => {
  return {
    type: StatusActionTypes.SET_CURRENT_UNIVERSITY,
    payload: { university }
  };
};

export const setCurrentCity: StatusDispatch<ICity> = (city) => {
  return {
    type: StatusActionTypes.SET_CURRENT_CITY,
    payload: { city }
  };
};

export const setLoading: StatusDispatch<boolean> = (loading) => {
  return {
    type: StatusActionTypes.SET_LOADING,
    payload: { loading }
  };
};

export const setUpdate: StatusDispatch<number> = (update) => {
  return {
    type: StatusActionTypes.SET_UPDATE,
    payload: { update }
  };
};

export const setStatus: StatusDispatch<string> = (status) => {
  return {
    type: StatusActionTypes.SET_STATUS,
    payload: { status }
  };
};
