import * as actionTypes from './actionTypes';

export const menuLeft = (menuLeftData: any[]) => {
  return {
    type: actionTypes.MENU_LEFT,
    menuLeftData
  };
};

export const menuTop = (menuTopData: any[]) => {
  return {
    type: actionTypes.MENU_TOP,
    menuTopData
  };
};
