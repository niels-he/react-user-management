import * as React from 'react';

import axios from 'axios';
import MainLayout from '../../../layouts/MainLayout';
import { Table, Icon, Input, Button } from 'antd';
import Helmet from 'react-helmet';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

export interface IUsersProps {
  children?: any;
  history: any;
  classes: any;
}

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface UsersState {
  tableData: User[] | undefined;
  data: User[] | undefined;
  filterDropdownVisible: boolean;
  searchText: string;
  filtered: boolean;
}

class Users extends React.Component<IUsersProps, any> {
  public state: UsersState = {
    tableData: undefined,
    data: undefined,
    filterDropdownVisible: false,
    searchText: '',
    filtered: false
  };

  public searchInput: any;

  public componentDidMount() {
    this.getData();
  }

  public getData = () => {
    // axios
    //   .get('/users')
    //   .then((res: any) => {
    //     const { alluser } = res.data.data;
    //     this.setState({
    //       tableData: alluser,
    //       data: alluser
    //     });
    //   })
    //   .catch((err: any) => {
    //     // ToDO: Error PopUp
    //     // tslint:disable-next-line:no-console
    //     console.log('error:', err);
    //   });

    const alluser = [
      {
        id: '1',
        name: 'John',
        role: 'admin',
        email: 'test@test.com'
      }
    ];

    this.setState({
      tableData: alluser,
      data: alluser
    });
  };

  public onInputChange = (e: any) => {
    this.setState({ searchText: e.target.value });
  };

  public onSearch = () => {
    const { searchText, tableData } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: tableData!
        .map(record => {
          const match = record.name.match(reg);
          if (!match) {
            return null;
          }
          return {
            ...record,
            name: (
              <span>
                {record.name.split(reg).map((text, i) =>
                  i > 0
                    ? [
                        <span key={1} className='highlight'>
                          {match[0]}
                        </span>,
                        text
                      ]
                    : text
                )}
              </span>
            )
          };
        })
        .filter(record => !!record)
    });
  };

  public linkSearchInput = (node: any) => {
    this.searchInput = node;
  };

  public deleteUser = (id: any) => {
    // axios
    //   .delete('/users/delete/' + id)
    //   .then((res: any) => {
    //     this.getData();
    //   })
    //   .catch((err: any) => {
    //     // ToDO: Error PopUp
    //     // tslint:disable-next-line:no-console
    //     console.log('error:', err);
    //   });
  };

  public render() {
    const { data, searchText, filtered, filterDropdownVisible } = this.state;
    const { classes } = this.props;

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text: any) => `#${text}`,
        sorter: (a: any, b: any) => a.id - b.id
      },
      {
        title: 'Name',
        dataIndex: 'name,id',
        key: 'name',
        sorter: (a: any, b: any) => a.name.length - b.name.length,
        render: (text: any, dataObject: any) => dataObject.name,
        filterDropdown: (
          <div className='custom-filter-dropdown'>
            <Input
              ref={this.linkSearchInput}
              placeholder='Search name'
              value={searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type='primary' onClick={this.onSearch}>
              Search
            </Button>
          </div>
        ),
        filterIcon: (
          <Icon
            type='search'
            style={{ color: filtered ? '#108ee9' : '#aaa' }}
          />
        ),
        filterDropdownVisible,
        onFilterDropdownVisibleChange: (visible: any) => {
          this.setState(
            {
              filterDropdownVisible: visible
            },
            () => this.searchInput && this.searchInput.focus()
          );
        }
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email,id',
        render: (text: any, dataObject: any) => text,
        sorter: (a: any, b: any) => a.email.length - b.email.length
      },
      {
        title: 'Actions',
        key: 'action',
        dataIndex: 'id',
        render: (id: any) => (
          <span>
            <Button
              className='mr-1'
              size='small'
              onClick={() => {
                this.props.history.push('/admin/user/' + id);
              }}>
              View
            </Button>
            <Button
              size='small'
              onClick={() => {
                this.deleteUser(id);
              }}>
              Delete
            </Button>
          </span>
        )
      }
    ];
    return (
      <MainLayout>
        <div>
          <Helmet title='Alle User' />
          <div className='card'>
            <div className={`card-header ${classes.CardHeader}`}>
              <div className='utils__title'>
                <strong>All Users</strong>
              </div>
              <Button
                className='btn btn-primary'
                size='default'
                onClick={() => {
                  this.props.history.push('/admin/user/new');
                }}>
                Add new User
              </Button>
            </div>
            <div className='card-body'>
              <Table
                className='utils__scrollTable'
                scroll={{ x: '100%' }}
                columns={columns}
                dataSource={data}
              />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}
export default compose(
  withStyles(theme => ({
    CardHeader: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  })),
  withRouter
)(Users);
