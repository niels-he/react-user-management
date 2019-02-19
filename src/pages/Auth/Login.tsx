import * as React from 'react';
import { Helmet } from 'react-helmet';
import './login.module.css';
import LoginForm from './LoginForm/LoginForm';

class Login extends React.Component {
  public state = {
    fullScreen: true,
    backgroundNumber: 2
  };

  public render() {
    const { fullScreen, backgroundNumber } = this.state;

    return (
      <div>
        <Helmet title='Login Alpha' />
        <section
          className={`  login ${fullScreen ? 'fullscreen' : 'windowed'}`}
          style={{
            backgroundImage: `url('resources/images/photos/${backgroundNumber}.jpeg')`
          }}>
          <header className={'header'}>
            {/* <a className={'logo'} href='javascript: void(0);'>
              <img
                src='resources/images/logo-inverse.png'
                alt='Clean UI Admin Template'
              />
            </a> */}
          </header>
          <div className={'content'}>
            <div className={'form'}>
              <p className={'formTitle'}>Login</p>
              <LoginForm />
            </div>
          </div>
          <footer className={'footer'}>
            {/* <ul className={'footerNav'}>
              <li>
                <a href='javascript: void(0);'>Terms of Use</a>
              </li>
            </ul> */}
          </footer>
        </section>
      </div>
    );
  }
}

export default Login;
