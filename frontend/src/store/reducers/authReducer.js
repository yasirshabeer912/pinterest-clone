// reducers/authReducer.js
const initialState = {
    token: null,
    user: null,
    userDetails: null, 
  };
  

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                token: null,
                user: null,
                userDetails:null, 
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'SET_USER_DETAILS':
            return {
                ...state,
                userDetails: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
