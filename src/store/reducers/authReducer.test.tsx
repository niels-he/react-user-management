import * as actionTypes from '../actions/actionTypes';
import reducer from './authReducer';

describe('auth reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      authRole: null,
      error: null,
      loading: false,
      id: null,
      name: null
    });
  });

  it('should store the token and authRole upon authSuccess', () => {
    expect(
      reducer(
        {
          token: null,
          authRole: null,
          error: null,
          loading: false,
          id: null,
          name: null
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          token: 'some-token',
          authRole: 'some-user-role',
          id: 1,
          name: 'test'
        }
      )
    ).toEqual({
      token: 'some-token',
      authRole: 'some-user-role',
      error: null,
      loading: false,
      id: 1,
      name: 'test'
    });
  });

  it('should store token and authRole as null upon authLogout', () => {
    expect(
      reducer(
        {
          token: 'some-token',
          authRole: 'some-user-role',
          error: null,
          loading: false,
          id: 1,
          name: 'test'
        },
        {
          type: actionTypes.AUTH_LOGOUT
        }
      )
    ).toEqual({
      token: null,
      authRole: null,
      error: null,
      loading: false,
      id: null,
      name: null
    });
  });

  it('should store loding to true and error to null upon authStart', () => {
    expect(
      reducer(
        {
          token: null,
          authRole: null,
          error: 'error',
          loading: false,
          id: null,
          name: null
        },
        {
          type: actionTypes.AUTH_START
        }
      )
    ).toEqual({
      token: null,
      authRole: null,
      error: null,
      loading: true,
      id: null,
      name: null
    });
  });

  it('should store error upon authFail', () => {
    expect(
      reducer(
        {
          token: null,
          authRole: null,
          error: null,
          loading: false,
          id: null,
          name: null
        },
        {
          type: actionTypes.AUTH_FAIL,
          error: 'error'
        }
      )
    ).toEqual({
      token: null,
      authRole: null,
      error: 'error',
      loading: false,
      id: null,
      name: null
    });
  });
});
