import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;

interface UserFormComponentProps {
  form: any;
  classes: any;
  history: any;
  match: any;
  location: any;
  isEditMode: boolean;
}

interface State {
  id: number | undefined;
  name: string | undefined;
  role: string | undefined;
  email: string | undefined;
  password: string | undefined;
  password_confirmation: string | undefined;
  newId: number | undefined;
  redirect: boolean;
}

class UserFormComponent extends React.Component<UserFormComponentProps, any> {
  public state: State = {
    id: undefined,
    password: undefined,
    email: undefined,
    role: undefined,
    name: undefined,
    newId: undefined,
    password_confirmation: undefined,
    redirect: false
  };

  public componentDidMount() {
    const { match, isEditMode } = this.props;
    if (isEditMode) {
      // axios
      //   .get('/accounts/get/' + match.params.id)
      //   .then((res: any) => {
      //     const { id, name, role, email, status } = res.data.data.user;
      //     this.setState({ id, name, role, email, status });
      //   })
      //   .catch((err: any) => {
      //     // ToDO: Error PopUp
      //     console.log('error:', err);
      //   });
      this.setState({
        id: 1,
        name: 'John',
        role: 'admin',
        email: 'test@test.com'
      });
    }
  }

  public handleSubmit = (e: any) => {
    e.preventDefault();
    const { id, redirect } = this.state;
    const { isEditMode, history } = this.props;
    const {
      validateFieldsAndScroll,
      getFieldsValue,
      resetFields
    } = this.props.form;

    validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        const formData = getFieldsValue();
        if (isEditMode === true) {
          axios.put('/users/push/' + id, formData).then(res => {
            if (res.data.success) {
              console.log(res.data.success);
              if (redirect) {
                history.push('/admin/users/');
              }
            }
          });
        } else {
          axios.post('/users/post', formData).then(res => {
            if (res.data.success) {
              resetFields();
              this.setState({
                id: undefined,
                password: undefined,
                email: undefined,
                role: undefined,
                name: undefined,
                status: undefined,
                newId: res.data.data.user.id
              });
            }
          });
        }
      }
    });
    this.setState({ redirect: false });
  };

  public handleChange = (name: string) => (event: any): void => {
    this.setState({
      [name]: event.target.value
    });
  };

  public render() {
    const { form, isEditMode } = this.props;
    const {
      password,
      email,
      name,
      role,
      newId,
      password_confirmation
    } = this.state;

    let passwordInput;
    if (isEditMode) {
      passwordInput = (
        <FormItem label='Password'>
          {form.getFieldDecorator('password', {
            rules: [
              {
                min: 6,
                message: 'The password needs to have at least 6 letters!'
              }
            ],
            initialValue: password
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              onChange={this.handleChange('password')}
            />
          )}
        </FormItem>
      );
    } else {
      passwordInput = [
        <FormItem label='Password' key='1'>
          {form.getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please enter a valid password!'
              },
              {
                min: 6,
                message: 'The password needs to have at least 6 letters!'
              }
            ],
            initialValue: password
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              onChange={this.handleChange('password')}
            />
          )}
        </FormItem>,
        <FormItem label='Password' key='2'>
          {form.getFieldDecorator('password_confirmation', {
            rules: [
              {
                required: true,
                message: 'Please reenter the password!'
              },
              {
                min: 6,
                message: 'The password needs to have at least 6 letters!'
              },
              {
                validator: (rule: any, value: any, cb: any) => {
                  if (value.length >= 6) {
                    value === password ? cb() : cb(true);
                  } else {
                    cb();
                  }
                },
                message: 'The passwords are not equal!'
              }
            ],
            initialValue: password_confirmation
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
            />
          )}
        </FormItem>
      ];
    }

    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <FormItem label='Name'>
          {form.getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please enter a name!'
              }
            ],
            initialValue: name
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={name}
              onChange={this.handleChange('name')}
            />
          )}
        </FormItem>
        <FormItem label='Role'>
          {form.getFieldDecorator('role', {
            rules: [
              {
                required: true,
                message: 'Please enter a role!'
              }
            ],
            initialValue: role
          })(
            <Input
              prefix={
                <Icon type='solution' style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder={role}
              onChange={this.handleChange('role')}
            />
          )}
        </FormItem>
        <FormItem label='Email'>
          {form.getFieldDecorator('email', {
            rules: [
              { required: true, message: 'Please enter a email!' },
              {
                pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
                message: 'Please enter a valid email!'
              }
            ],
            initialValue: email
          })(
            <Input
              prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='email'
              placeholder={email}
              onChange={this.handleChange('email')}
            />
          )}
        </FormItem>
        {passwordInput}
        <div className='form-actions'>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button mr-1'>
            Save
          </Button>
          {newId ? (
            <Button
              type='default'
              className='login-form-button'
              onClick={() => {
                this.props.history.push('/admin/users/' + newId);
              }}>
              User Details
            </Button>
          ) : null}
          {isEditMode ? (
            <Button
              type='default'
              htmlType='submit'
              className='login-form-button'
              onClick={() => {
                this.setState({ redirect: true });
              }}>
              Save and Back
            </Button>
          ) : null}
        </div>
      </Form>
    );
  }
}

const UserForm = Form.create()(UserFormComponent);

export default compose(withRouter)(UserForm) as any;
