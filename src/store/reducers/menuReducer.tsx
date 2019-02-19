import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';
import { getLeftMenuData } from 'src/shared/menu';

export interface MenuState {
  menuLeftData: any[];
  menuTopData: any[];
}

const initialState: MenuState = {
  menuLeftData: getLeftMenuData(true),
  menuTopData: []
};

const menuLeft = (state: MenuState, action: any) => {
  return updateObject(state, {
    menuLeftData: action.menuLeftData
  });
};

const menuTop = (state: MenuState, action: any) => {
  return updateObject(state, {
    menuTopData: action.menuTopData
  });
};

export default function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case actionTypes.MENU_LEFT:
      return menuLeft(state, action);
    case actionTypes.MENU_TOP:
      return menuTop(state, action);
    default:
      return state;
  }
}
