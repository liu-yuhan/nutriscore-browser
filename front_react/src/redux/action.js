import { reqRegister, reqLogin, reqProfile } from "../api_connection/index";

import { USER_VALID, ERR_MSG, USER_LOGIN, USER_PROFILE } from "./action_type";
import setAuthToken from "../utils/setAuthToken.js";

// synchronize function wait to be called in asyn function register
const userValid = user => ({ type: USER_VALID, data: user });
const errorMsg = err => ({ type: ERR_MSG, data: err });
const userLogin = user => ({ type: USER_LOGIN, data: user });
const userProfile = user => ({ type: USER_PROFILE, data: user });

export const register = user => {
  const { name, email, password, password_confirm } = user;
  if (!name || !email || !password || !password_confirm) {
    return errorMsg(" Information required, shouldn't be empty ");
  }
  if (password !== password_confirm) {
    return errorMsg("Confirm_password isn't identical to password");
  }
  return async dispatch => {
    const response = await reqRegister({ name, email, password });
    console.log("response : ", response);
    const result = response.data;
    console.log("result1 : ", result);
    if (result.code === 1) {
      //code 0, register success
      //dispacher success action
      // dispatch(userValid(result.data));
      dispatch(errorMsg(result.errors[0].msg));
    } else {
      console.log("result2: ", result);
      const { token } = result;
      localStorage.setItem("jwToken", token);
      setAuthToken(token);
      dispatch(userValid(result));
    }
  };
};

export const login = user => {
  const { email, password } = user;
  if (!email || !password) {
    return errorMsg(" Information required, shouldn't be empty ");
  }

  return async dispatch => {
    const response = await reqLogin({ email, password });
    const result = response.data;
    console.log(result);
    if (result.code === 1) {
      //code 0, register success
      //dispacher success action
      // dispatch(userValid(result.data));
      dispatch(errorMsg(result.errors[0].msg));
    } else {
      console.log("result: ", result);
      const { token } = result;
      localStorage.setItem("jwToken", token);
      setAuthToken(token);
      dispatch(userValid(result));
    }
  };
};

export const profile = user => {
  const { id } = user;

  return async dispatch => {
    const response = await reqProfile({ id });
    const result = response.data;
    console.log('Profile', result);
    dispatch(userValid(result))
  };
};