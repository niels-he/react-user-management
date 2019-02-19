import * as React from 'react';
// import DrawerMenu from 'rc-drawer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as actions from '../../store/actions/index';
import MenuLeft from './MenuLeft/MenuLeft';
import 'rc-drawer/assets/index.css';

interface AppMenuProps {
  isMobileMenuOpen: any;
  isMenuTop: any;
  isMobileView: any;
  isLightTheme: any;
  updateSettings: any;
}

class AppMenu extends React.Component<AppMenuProps, any> {
  public toggleOpen = () => {
    const { isMobileMenuOpen, updateSettings } = this.props;
    document
      .querySelector('#root')!
      .setAttribute(
        'style',
        !isMobileMenuOpen ? 'overflow: hidden; width: 100%; height: 100%;' : ''
      );
    updateSettings({ isMobileMenuOpen: !isMobileMenuOpen });
  };

  public render() {
    const {
      isMenuTop,
      isMobileMenuOpen,
      isMobileView,
      isLightTheme
    } = this.props;
    const BootstrappedMenu = () => {
      return <MenuLeft />;
    };

    return BootstrappedMenu();
  }
}

const mapStateToProps = (state: any) => ({
  isLightTheme: state.settings.isLightTheme,
  isMenuTop: state.settings.isMenuTop,
  isMobileMenuOpen: state.settings.isMobileMenuOpen,
  isMobileView: state.settings.isMobileView
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSettings: (payload: object) =>
      dispatch(actions.settingsUpdate(payload))
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AppMenu);
