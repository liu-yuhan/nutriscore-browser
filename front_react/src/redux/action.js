import {reqRegister} from '../api_connection/index'

import { USER_VALID , ERR_MSG} from './action_type'

// synchronize function wait to be called in asyn function register
const userValid = (user)=>({ type:'USER_VALID', data:user })
const errorMsg = (err)=>({type:'ERR_MSG',data:err})

export const register = (user)=>{
   const {name, email, password, password_confirm } = user
   if (!name || !email || !password ||!password_confirm ){
       return errorMsg(" Information required, shouldn't be empty ")
    } 
   if (password != password_confirm){
        return errorMsg("Confirm_password isn't identical to password")
    }
    return async (dispatch) => {
        const response = await reqRegister(name, email,password )
        
    }

}