// actions/authActions.js
import axios from 'axios';

export const loginSuccess = (token) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: token,
    };
};

export const logout = () => {
    
    return {
        type: 'LOGOUT',
    };
};

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user,
    };
};
export const setUserDetails = (userDetails) => {
    return {
        type: 'SET_USER_DETAILS',
        payload: userDetails,
    };
};


export const decodeToken = (token) => {
    console.log('token in the decode token function ',token);
    return async (dispatch) => {
        try {
            const apiUrl = "http://localhost:5000/api/users/decodeToken";
            const response = await axios.post(apiUrl, null, {
                headers: {
                    Authorization: token,
                },
            });

            const decodedData = response.data;
            dispatch(setUser(decodedData));
            dispatch(loginSuccess(token));
            // You can also dispatch additional actions with the decoded information if needed
        } catch (error) {
            console.error('aayien', error);
        }
    };
};

export const getUserDetails = (userId) => {
    return async (dispatch) => {

        try {
            const apiUrl = `http://localhost:5000/api/users/getUser/${userId}`;
            const response = await axios.get(apiUrl);
            console.log(response);
            const userDetails = response.data;
            // console.log('user Details', userDetails);
            dispatch(setUserDetails(userDetails));
        } catch (error) {
            console.error(error);
        }
    };
};

    