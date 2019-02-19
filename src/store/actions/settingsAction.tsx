import * as actionTypes from './actionTypes';

export const settingsUpdate = (payload: any) => {
  return {
    type: actionTypes.SETTINGS_UPDATE,
    payload
  };
};
