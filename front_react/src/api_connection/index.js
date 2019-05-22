import api_connector from './api_connector'

// give api_connector real parameters and create a new async function
//wait to be called by action/dispatcher

export const reqRegister = (user) => api_connector('/register',user,'POST')

