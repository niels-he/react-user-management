import * as React from 'react';
import MainLayout from '../../../../layouts/MainLayout';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';

export interface UserEditProps {
  classes?: any;
  match: any;
  location: any;
  history: any;
}

class UserEdit extends React.Component<UserEditProps, any> {
  public render() {
    const breadcrumbs = (
      <>
        <span className={`arrow text-muted`} />
        <Link to='/admin/users' className='text-muted'>
          Users
        </Link>
        <span className={'arrow'} />
        <strong>Edit User</strong>
      </>
    );

    return (
      <MainLayout breadcrumbs={breadcrumbs}>
        <div className={'content'}>
          <div className={'form'}>
            <p className={'formTitle'}>Edit User</p>
            <UserForm isEditMode={true} />
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default compose(withRouter)(UserEdit) as any;
