import * as React from 'react';

import { DatePicker } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import MainLayout from '../../../layouts/MainLayout';

export interface DashboardProps {
  authRole: string;
  children?: any;
  name: string;
}

export const Dashboard = (props: DashboardProps) => {
  return (
    <MainLayout>
      <div className='card'>
        <div className='card-body'>
          <h5 className='mb-3 text-black'>
            <strong>Dashboard</strong>
          </h5>
          <p>
            Hey <strong>{props.name}</strong>, you are logged in as
            <strong> {props.authRole}</strong>.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

const mapStateToProps = (state: any) => {
  return {
    authRole: state.auth.authRole,
    name: state.auth.name
  };
};

export default compose(
  connect(
    mapStateToProps,
    null
  )
)(Dashboard);
