import { reqRegister, reqLogin } from "../api_connection/index";

import { USER_VALID, ERR_MSG, USER_LOGIN } from "./action_type";

// synchronize function wait to be called in asyn function register
const userValid = user => ({ type: USER_VALID, data: user });
const errorMsg = err => ({ type: ERR_MSG, data: err });
const userLogin = user => ({ type: USER_LOGIN, data: user });

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
    console.log(response);
    const result = response.data;
    if (result.code === 1) {
      //code 0, register success
      //dispacher success action
      // dispatch(userValid(result.data));
      dispatch(errorMsg(result.errors[0].msg));
    } else {
      //code 1, register failed
      //dispacher failed action
      dispatch(userValid(result.data));
    }
  };
};

export const login = user => {
  const { email, password } = user;
  if (!email || !password) {
    return errorMsg();
  }

  return async dispatch => {
    const response = await reqLogin({ email, password });
    const result = response.data;
    if (result.code === 0) {
      dispatch(userLogin(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};
