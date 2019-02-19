import * as React from 'react';

import axios from 'axios';
import MainLayout from '../../../layouts/MainLayout';

export interface IProfileProps {
  children?: any;
}

interface IState {
  id: number | null;
  name: string | null;
  role: string | null;
  email: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

class Profile extends React.Component<IProfileProps, any> {
  public state: IState = {
    id: null,
    name: null,
    role: null,
    email: null
  };
  public componentDidMount() {
    // axios
    //   .get('/profile')
    //   .then((res: any) => {
    //     const { id, name, role, email, email_verified_at } = res.data.data.user;
    //     this.setState({ id, name, role, email, });
    //   })
    //   .catch((err: any) => {
    //     // ToDO: Error PopUp
    //     // tslint:disable-next-line:no-console
    //     console.log('error:', err);
    //   });
    this.setState({
      id: 1,
      name: 'John',
      role: 'admin',
      email: 'test@test.com'
    });
  }

  public render() {
    const { name, email } = this.state;
    return (
      <MainLayout>
        <div className='card'>
          <div className='card-body'>
            <h5 className='mb-3 text-black'>
              <strong>Profile</strong>
            </h5>
            <dl className='row'>
              <dt className='col-xl-3'>Name:</dt>
              <dd className='col-xl-9'>{name}</dd>
              <dt className='col-xl-3'>Email:</dt>
              <dd className='col-xl-9'>{email}</dd>
            </dl>
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default Profile;
