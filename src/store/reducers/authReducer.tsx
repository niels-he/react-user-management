import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

export interface IAuthState {
  token: string | null;
  authRole: string | null;
  error: any;
  loading: boolean;
  id: number | null;
  name: string | null;
}

const initialState: IAuthState = {
  token: null,
  authRole: null,
  error: null,
  loading: false,
  id: null,
  name: null
};

const authStart = (state: IAuthState, action: any) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state: IAuthState, action: any) => {
  return updateObject(state, {
    token: action.token,
    authRole: action.authRole,
    error: null,
    loading: false,
    id: action.id,
    name: action.name
  });
};

const authFail = (state: IAuthState, action: any) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state: IAuthState, action: any) => {
  return updateObject(state, {
    token: null,
    authRole: null,
    id: null,
    name: null
  });
};

const reducer = (state: IAuthState = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
