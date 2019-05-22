import api_connetor from api_connetor ;

// give api_connector real parameters and create a new async function
//wait to be called by action/dispatcher

const reqRegister = (user) => api_connetor('/register',user,'POST')