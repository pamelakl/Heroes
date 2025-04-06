export const userDataInitialState = null; //{user: null, token:"", admin:false};

const loginReducer = (userData, action) =>{
    switch(action.type){
        case "LOGIN":
            const newUser = action.user //{user: { ...action.user}, token:action.token, admin:false}
            localStorage.setItem('userData', JSON.stringify(newUser));
            console.log("got to here ")
            console.log(newUser);
         //   console.log(userData);
            console.log(action)
          //  return {user: { ...action.user}, token:action.token, admin:action.user.admin};
            return newUser;
        case "LOGOUT":
            localStorage.setItem('userData', JSON.stringify(userDataInitialState))
            return { user: null, token:"", admin:false};
        default: 
            return {...userData};

    }
}

export default loginReducer;