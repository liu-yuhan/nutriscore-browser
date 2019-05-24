import { combineReducers } from "redux";
import { USER_VALID, ERR_MSG, USER_LOGIN } from "./action_type";

const initUser = {
  name: "",
  email: "",
  password: "",
  msg: "",
  redirect: "",
  token: "False"
};

function user(state = initUser, action) {
  switch (action.type) {
    case USER_VALID:
      return { ...action.data, redirect: true };
    case USER_LOGIN:
      return { ...action.data, redirect: true };
    case ERR_MSG:
      return { ...state, msg: action.data };
    default:
      return state;
  }
}

export default combineReducers({ user });
