import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

export const authSuccess = (
  token: string,
  authRole: string,
  id: number,
  name: string
) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    authRole,
    id,
    name
  };
};

export const authFail = (error: any) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const authLogout = () => {
  localStorage.removeItem('userData');

  return { type: actionTypes.AUTH_LOGOUT };
};

export const auth = (username: string, password: string, history: any) => {
  return (dispatch: any) => {
    dispatch(authStart());
    const authData = {
      email: username,
      password
    };

    // axios
    //   .post('/login', authData)
    //   .then(res => {
    //     if (res.data.success) {
    //       // Get the Token from the response
    //       const { token, role, id, name, user_modules } = res.data.data;
    //       // const { authRole } = res.data;

    //       // Set a localeStorage item with the token so the userer stays logged in
    //       localStorage.setItem(
    //         'userData',
    //         JSON.stringify({
    //           token,
    //           role,
    //           id,
    //           name
    //         })
    //       );

    //       // Set Axios Authorization
    //       axios.defaults.headers.common.Authorization = 'bearer ' + token;

    //       // Get the name of the role from the token
    //       // const role = JSON.parse(Base64.decode(token));

    //       // Dont't redirect to last url if it is '/login', otherwise an infinite loop is created
    //       if (history.location.pathname !== '/login') {
    //         history.push(history.location.pathname);
    //       } else {
    //         // Redirect to the dashboard
    //         history.push('/dashboard');
    //       }

    //       dispatch(authSuccess(token, role, id, name));
    //     }
    //     })
    //     .catch(err => {
    //       dispatch(authFail(err.data));
    //       // tslint:disable-next-line:no-console
    //       console.log('error:', err);
    //     });

    localStorage.setItem(
      'userData',
      JSON.stringify({
        token: 'testToken',
        role: 'admin',
        id: 1,
        name: 'John'
      })
    );

    dispatch(authSuccess('testToken', 'admin', 1, 'John'));
  };
};

export const authCheckState = () => {
  return (dispatch: any) => {
    const tokenJSON = localStorage.getItem('userData');
    if (!tokenJSON) {
      dispatch(authLogout());
    } else {
      try {
        // Get the name of the role from the token
        // const { role } = JSON.parse(Base64.decode(token.split('.')[1]));
        const { token, role, id, name } = JSON.parse(tokenJSON);

        // Set Axios Authorization
        axios.defaults.headers.common.Authorization = 'bearer ' + token;

        dispatch(authSuccess(token, role, id, name));
      } catch {
        dispatch(authLogout());
      }
    }
  };
};
