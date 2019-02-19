import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import * as actions from '../../../store/actions/index';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

interface LoginFormComponentProps {
  form: any;
  classes: any;
  history: any;
  loading: boolean;
  error: any;
  isAuthenticated: boolean;
  authRole: string;
  onAuth: any;
}
class LoginFormComponent extends React.Component<LoginFormComponentProps, any> {
  public state = {
    password: '',
    username: ''
  };

  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.username,
      this.state.password,
      this.props.history
    );
  };

  public handleChange = (name: string) => (event: any): void => {
    this.setState({
      [name]: event.target.value
    });
  };

  public render() {
    const { form } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <FormItem label='Email'>
          {form.getFieldDecorator('userName', {
            rules: [
              {
                required: true,
                message: "Please enter you're email!"
              },
              {
                pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
                message: 'The email is nor valid!'
              }
            ],
            initialValue: this.state.username
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Benutzername'
              onChange={this.handleChange('username')}
            />
          )}
        </FormItem>
        <FormItem label='Password'>
          {form.getFieldDecorator('password', {
            rules: [
              { required: true, message: "Please enter you're password!" }
            ],
            initialValue: this.state.password
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='Passwort'
              onChange={this.handleChange('password')}
            />
          )}
        </FormItem>
        <div className='form-actions'>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'>
            Login
          </Button>
        </div>
      </Form>
    );
  }
}

const LoginForm = Form.create()(LoginFormComponent);

const mapStateToProps = (state: any) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRole: state.auth.authRole
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAuth: (username: string, password: string, history: any) =>
      dispatch(actions.auth(username, password, history))
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginForm);
