import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import AppMenu from '../components/Menu/AppMenu';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

export interface MainLayoutProps {
  children: any;
  classes: any;
  breadcrumbs: any;
}

export class MainLayout extends React.Component<MainLayoutProps, any> {
  public render() {
    const { classes, breadcrumbs } = this.props;

    return (
      <div className={classes.MainLayout}>
        <AppMenu />

        <div className={classes.Breadcrumbs}>
          {this.props.breadcrumbs ? (
            <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
          ) : (
            <Breadcrumbs />
          )}
          <main className={classes.Content}>{this.props.children}</main>
        </div>
      </div>
    );
  }
}
export default compose(
  withStyles(theme => ({
    Content: {
      margin: 25
    },
    MainLayout: {
      display: 'flex'
    },
    Breadcrumbs: {
      width: '100%'
    }
  })),
  withRouter
)(MainLayout) as any;
 