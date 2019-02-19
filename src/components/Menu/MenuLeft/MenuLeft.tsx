import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import Scrollbars from 'react-custom-scrollbars';
import * as _ from 'lodash';
import { any } from 'prop-types';
import { compose } from 'recompose';
import * as actions from '../../../store/actions/index';
import './MenuLeft.css';

const { Sider } = Layout;
const { SubMenu, Divider } = Menu;

interface MenuLeftProps {
  menuData: any;
  isMenuCollapsed: any;
  isSettingsOpen: any;
  isMobileView: any;
  isMobileMenuOpen: any;
  isLightTheme: any;
  updateSettings: any;
}

class MenuLeft extends React.Component<MenuLeftProps, any> {
  public state = {
    openedKeys: [],
    selectedKeys: []
  };
  // state = {
  //   openedKeys: store.get('app.menu.openedKeys') || [],
  //   selectedKeys: store.get('app.menu.selectedKeys') || []
  // };

  public componentWillMount() {
    this.setSelectedKeys(this.props);
  }

  public componentWillReceiveProps(newProps: any) {
    if (newProps.isMenuCollapsed && !newProps.isMobileView) {
      this.setState({
        openedKeys: []
      });
    }
    this.setSelectedKeys(newProps);
  }

  public setSelectedKeys = (props: any) => {
    const { menuData } = this.props;
    const flattenItems = (items: any, key: any) =>
      items.reduce((flattenedItems: any, item: any) => {
        flattenedItems.push(item);
        if (Array.isArray(item[key])) {
          return flattenedItems.concat(flattenItems(item[key], key));
        }
        return flattenedItems;
      }, []);
    const selectedItem = _.find(flattenItems(menuData, 'children'), [
      'url',
      props.location.pathname
    ]);
    this.setState({
      selectedKeys: selectedItem ? [selectedItem.key] : []
    });
  };

  public onCollapse = (value: any, type: any) => {
    const { isMenuCollapsed, updateSettings } = this.props;
    if (type === 'responsive' && isMenuCollapsed) {
      return;
    }
    updateSettings({ isMenuCollapsed: !isMenuCollapsed });

    this.setState({
      openedKeys: []
    });
  };

  public onOpenChange = (openedKeys: any) => {
    // const { updateSettings } = this.props;
    // updateSettings(openedKeys);
    this.setState({
      openedKeys
    });
  };

  public handleClick = (e: any) => {
    const {
      isSettingsOpen,
      isMobileView,
      isMobileMenuOpen,
      updateSettings
    } = this.props;

    // store.set('app.menu.selectedKeys', [e.key]);

    // close menu if mobile menu opened
    if (isMobileView) {
      setTimeout(() => {
        updateSettings({ isMobileMenuOpen: !isMobileMenuOpen });
      }, 500);
    }
    // custom action on settings menu item
    if (e.key === 'settings') {
      updateSettings({ isSettingsOpen: !isSettingsOpen });
      return;
    }
    this.setState({
      selectedKeys: [e.key],
      openKeys: e.keyPath
    });
  };

  public generateMenuItems = () => {
    const { menuData = [] } = this.props;
    const generateItem = (item: any) => {
      const { key, title, url, icon, disabled } = item;
      if (item.divider) {
        return <Divider key={Math.random()} />;
      }
      if (item.url) {
        return (
          <Menu.Item key={key} disabled={disabled}>
            {item.target ? (
              <a href={url} target={item.target} rel='noopener noreferrer'>
                {icon && <span className={`${icon}  icon`} />}
                <span className={'title'}>{title}</span>
              </a>
            ) : (
              <Link to={url}>
                {icon && <span className={`${icon}  icon`} />}
                <span className={'title'}>{title}</span>
              </Link>
            )}
          </Menu.Item>
        );
      }
      return (
        <Menu.Item key={key} disabled={disabled}>
          <span className={'title'}>{title}</span>
          {icon && <span className={`${icon}  icon`} />}
        </Menu.Item>
      );
    };

    const generateSubmenu = (items: any) =>
      items.map((menuItem: any) => {
        if (menuItem.children) {
          const subMenuTitle = (
            <span key={menuItem.key}>
              <span className={'title'}>{menuItem.title}</span>
              {menuItem.icon && <span className={`${menuItem.icon}  icon`} />}
            </span>
          );
          return (
            <SubMenu title={subMenuTitle} key={menuItem.key}>
              {generateSubmenu(menuItem.children)}
            </SubMenu>
          );
        }
        return generateItem(menuItem);
      });

    return menuData.map((menuItem: any) => {
      if (menuItem.children) {
        const subMenuTitle = (
          <span key={menuItem.key}>
            <span className={'title'}>{menuItem.title}</span>
            {menuItem.icon && <span className={`${menuItem.icon}  icon`} />}
          </span>
        );
        return (
          <SubMenu title={subMenuTitle} key={menuItem.key}>
            {generateSubmenu(menuItem.children)}
          </SubMenu>
        );
      }
      return generateItem(menuItem);
    });
  };

  public render() {
    const { selectedKeys, openedKeys } = this.state;
    const { isMobileView, isMenuCollapsed, isLightTheme } = this.props;
    const menuSettings = isMobileView
      ? {
          collapsed: false,
          collapsible: false,
          onCollapse: this.onCollapse,
          width: 256
        }
      : {
          // breakpoint:'md',
          collapsed: isMenuCollapsed,
          collapsible: true,
          onCollapse: this.onCollapse,
          width: 256
        };

    const menu = this.generateMenuItems();

    return (
      <Sider
        {...menuSettings}
        className={isLightTheme ? ` menu light` : 'menu '}>
        <div className={'logo-menu-left'}>
          <div className={'logoContainer'}>
            {/* <img
              src={`resources/images/logo-inverse${
                menuSettings.collapsed ? '-mobile' : ''
              }.png`}
              alt=''
            /> */}
          </div>
        </div>

        <Scrollbars
          className={isMobileView ? 'scrollbarMobile' : 'scrollbarDesktop'}
          autoHide={true}>
          <Menu
            theme={isLightTheme ? 'light' : 'dark'}
            onClick={this.handleClick}
            selectedKeys={selectedKeys}
            openKeys={openedKeys}
            onOpenChange={this.onOpenChange}
            mode='inline'
            className={'navigation'}>
            {menu}
          </Menu>
        </Scrollbars>
      </Sider>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isLightTheme: state.settings.isLightTheme,
  isMenuCollapsed: state.settings.isMenuCollapsed,
  isMobileMenuOpen: state.settings.isMobileMenuOpen,
  isMobileView: state.settings.isMobileView,
  isSettingsOpen: state.settings.isSettingsOpen,
  menuData: state.menu.menuLeftData
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
)(MenuLeft);
