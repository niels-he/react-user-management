import * as React from 'react';
import MainLayout from '../../../../layouts/MainLayout';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';

export interface UserNewProps {
  classes?: any;
  match: any;
  location: any;
  history: any;
}

class UserNew extends React.Component<UserNewProps, any> {
  public searchInput: any;

  public render() {
    const breadcrumbs = (
      <>
        <span className={`arrow text-muted`} />
        <Link to='/admin/users' className='text-muted'>
          Users
        </Link>
        <span className={'arrow'} />
        <strong>Add User</strong>
      </>
    );

    return (
      <MainLayout breadcrumbs={breadcrumbs}>
        <div className={'content'}>
          <div className={'form'}>
            <p className={'formTitle'}>Add User</p>
            <UserForm isEditMode={false} />
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default compose(withRouter)(UserNew) as any;
