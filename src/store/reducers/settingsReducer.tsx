import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

export interface SettingsState {
  isMobileView: boolean;
  isMobileMenuOpen: boolean;
  isLightTheme: boolean;
  isSettingsOpen: boolean;
  isMenuCollapsed: boolean;
  isBorderless: boolean;
  isSquaredBorders: boolean;
  isFixedWidth: boolean;
  isMenuShadow: boolean;
  isMenuTop: boolean;
  locale: string;
}

const initialState: SettingsState = {
  isMobileView: false,
  isMobileMenuOpen: false,
  isLightTheme: false,
  isMenuTop: false,
  isSettingsOpen: false,
  isMenuCollapsed: false,
  isBorderless: true,
  isSquaredBorders: false,
  isFixedWidth: false,
  isMenuShadow: true,
  locale: 'de-DE'
};

const updateSettings = (state: SettingsState, action: any) => {
  return updateObject(state, { ...action.payload });
};

export default function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case actionTypes.SETTINGS_UPDATE:
      return updateSettings(state, action);
    default:
      return state;
  }
}
