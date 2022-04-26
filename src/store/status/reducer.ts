import { IStatusState, StatusAction, StatusActionTypes } from "./types";

const initialState: IStatusState = {
  university: {
    all: null,
    current: null
  },
  city: null,
  loading: false,
  update: (Date.now() - 36e6 * 24),
  status: "Прежде чем действовать, надо понять"
};

export function statusReducer(
  state: IStatusState = initialState,
  action: StatusAction
): IStatusState {
  switch (action.type) {
    case StatusActionTypes.GET_UNIVERSITIES:
      return {
        ...state,
        university: { ...state.university, all: action.payload.universities }
      };

    case StatusActionTypes.SET_CURRENT_UNIVERSITY:
      return {
        ...state,
        university: { ...state.university, current: action.payload.university }
      };

    case StatusActionTypes.SET_CURRENT_CITY:
      return {
        ...state,
        city: action.payload.city
      };

    case StatusActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      };

    case StatusActionTypes.SET_UPDATE:
      return {
        ...state,
        update: action.payload.update
      };

    case StatusActionTypes.SET_STATUS:
      return {
        ...state,
        status: action.payload.status
      };

    default:
      return state;
  }
}
