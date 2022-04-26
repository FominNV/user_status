import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { statusReducer } from "./status/reducer";

export type RootState = ReturnType<typeof combinedReducer>

const combinedReducer = combineReducers({
  status: statusReducer
});

const composeEnhancers = composeWithDevTools({});

export const store = createStore(
  combinedReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);
