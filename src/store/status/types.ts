import { Dispatch } from "react";

export interface IStatusState {
  university: {
    all: Nullable<IUniversity[]>;
    current: Nullable<IUniversity>;
  };
  city: Nullable<ICity>;
  loading: boolean;
  update: number;
  status: string
}

export interface IUniversity {
  "state-province": Nullable<string>;
  country: string;
  name: string;
  web_pages: string[];
  domains: string[];
  alpha_two_code: string;
}

export interface ICity {
  city: string;
  population: string;
}

export type StatusDispatch<T> = (agr: T) => StatusAction
export type FetchStatusDispatch = () => (dispatch: Dispatch<StatusAction>) => Promise<void>

export enum URLS {
  UNIVERSITY_URL = "http://universities.hipolabs.com/search?country=United+Kingdom"
}

export enum StatusActionTypes {
  GET_UNIVERSITIES = "GET_UNIVERSITIES",
  SET_CURRENT_UNIVERSITY = "SET_CURRENT_UNIVERSITY",
  SET_CURRENT_CITY = "SET_CURRENT_CITY",
  SET_LOADING = "SET_LOADING",
  SET_UPDATE = "SET_UPDATE",
  SET_STATUS = "SET_STATUS"
}

type GetUniversitiesAction = {
  type: StatusActionTypes.GET_UNIVERSITIES;
  payload: { universities: IUniversity[] };
};

type SetCurrentUniversityAction = {
  type: StatusActionTypes.SET_CURRENT_UNIVERSITY;
  payload: { university: IUniversity };
};

type SetCurrentCityAction = {
  type: StatusActionTypes.SET_CURRENT_CITY;
  payload: { city: ICity };
};

type SetLoadingAction = {
  type: StatusActionTypes.SET_LOADING;
  payload: { loading: boolean };
};

type SetUpdateAction = {
  type: StatusActionTypes.SET_UPDATE;
  payload: { update: number };
};

type SetStatusAction = {
  type: StatusActionTypes.SET_STATUS;
  payload: { status: string };
};

export type StatusAction =
| GetUniversitiesAction
| SetCurrentUniversityAction
| SetCurrentCityAction
| SetLoadingAction
| SetUpdateAction
| SetStatusAction
