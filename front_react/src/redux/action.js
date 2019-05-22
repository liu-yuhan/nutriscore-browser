import {reqRegister} from '../api_connection/index'

import { USER_VALID , ERR_MSG} from './action_type'

// synchronize function wait to be called in asyn function register
const userValid = (user)=>({ type: USER_VALID, data:user })
const errorMsg = (msg)=>({type:ERR_MSG, data:msg})

export const register = (user) => {
   const {name, email, password, password_confirm } = user
   if (!name || !email || !password ||!password_confirm ){
       return errorMsg(" Information required, shouldn't be empty ")
    } 
   if (password !== password_confirm){
        return errorMsg("Confirm_password isn't identical to password")
    }
    return async (dispatch) => {
        const response = await reqRegister({name, email,password})
        const result = response.data
        if(result.code===0){ //code 0, register success
            //dispacher success action            
            dispatch(userValid(result.data))
        }else{ //code 1, register failed
            //dispacher failed action
            dispatch(errorMsg(result.msg))
        }   
    }

}