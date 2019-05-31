import { combineReducers } from "redux";
import { USER_VALID, ERR_MSG, USER_LOGIN, USER_PROFILE } from "./action_type";

const initUser = {
  name: "",
  email: "",
  password: "",
  msg: "",
  redirect: "",
  token: "",
  id: ""
};

function user(state = initUser, action) {
  switch (action.type) {
    case USER_VALID:
      return { ...action.data, redirect: true };
    case USER_LOGIN:
      return { ...action.data, redirect: true };
    case USER_PROFILE:
<<<<<<< HEAD
      return { ...action.data};
=======
      return { ...action.data };
>>>>>>> yuhan
    case ERR_MSG:
      return { ...state, msg: action.data };
    default:
      return state;
  }
}

export default combineReducers({ user });
