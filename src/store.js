import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteuUpdateReducer } from "./reducers/noteReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const reducer =  combineReducers({
    userLogin: userLoginReducer, 
    userRegister: userRegisterReducer,
    noteList: noteListReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteuUpdateReducer,
    noteDelete: noteDeleteReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo"))
: null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
