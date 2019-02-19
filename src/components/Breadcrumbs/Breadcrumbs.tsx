import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { reduce } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as actions from '../../store/actions/index';
import './Breadcrumbs.css';

export interface BreadcrumbsProps {
  children?: any;
  isMenuTop: any;
  menuTopData: any;
  menuLeftData: any;
}

class Breadcrumbs extends React.Component<BreadcrumbsProps, any> {
  public state = {
    breadcrumb: []
  };

  public componentDidMount() {
    this.setBreadcrumbs(this.props);
  }

  public componentWillReceiveProps(newProps: any) {
    this.setBreadcrumbs(newProps);
  }

  public setBreadcrumbs = (props: any) => {
    const { isMenuTop, menuTopData, menuLeftData } = this.props;
    this.setState({
      breadcrumb: this.getBreadcrumb(
        props,
        isMenuTop ? menuTopData : menuLeftData
      )
    });
  };

  public getPath(data: any, url: any, parents: any = []): any {
    const items = reduce(
      data,
      (result, entry) => {
        if (result.length) {
          return result;
        }
        if (entry.url === url) {
          return [entry].concat(parents);
        }
        if (entry.children) {
          const nested = this.getPath(
            entry.children,
            url,
            [entry].concat(parents)
          );
          return (result || []).concat(nested.filter((e: any) => !!e));
        }
        return result;
      },
      []
    );
    return items.length > 0 ? items : [false];
  }

  public getBreadcrumb = (props: any, items: any) => {
    const [activeMenuItem, ...path] = this.getPath(
      items,
      props.location.pathname
    );

    if (activeMenuItem && path.length) {
      return path.reverse().map((item: any, index: any) => {
        if (index === path.length - 1) {
          return (
            <span key={item.key}>
              <span className={`arrow text-muted`} />
              <span className='text-muted'>{item.title}</span>
              <span className={'arrow'} />
              <strong>{activeMenuItem.title}</strong>
            </span>
          );
        }
        return (
          <span key={item.key}>
            <span className={`arrow text-muted`} />
            <span className='text-muted'>{item.title}</span>
          </span>
        );
      });
    }
    return (
      <span>
        <span className={'arrow'} />
        <strong>{activeMenuItem.title}</strong>
      </span>
    );
  };

  public render() {
    const { breadcrumb } = this.state;
    return (
      <div className={`breadcrumbs`}>
        <div className={'path'}>
          <Link to='/' className='text-muted'>
            Home
          </Link>

          {this.props.children ? this.props.children : breadcrumb}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isMenuTop: state.settings.isMenuTop,
  menuTopData: state.menu.menuTopData,
  menuLeftData: state.menu.menuLeftData
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
)(Breadcrumbs) as any;
