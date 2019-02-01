require('./HeaderView.scss');
import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import hearderConfig from '../../configs/hearderConfig';

const { Header } = Layout;
const { SubMenu, Item } = Menu;

export default class HeaderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'Login Please',
        nickName: '未登录',
      },
    };
  }

  componentDidMount() {
    // TODO: check is login and get user

    const user = this.getUserData();
    this.setState(() => ({
      user,
    }));

  }

  componentWillUnmount() {

  }

  shouldShowHref(item) {
    const { currNavMenuKeys = [] } = this.props;
    if (!item.url) {
      return false;
    }
    const currPageKeys = currNavMenuKeys.filter((k) => {
      return k === item.key;
    });
    if (currPageKeys.length > 0) {
      // return false;
    }
    return true;
  }

  getUserData() {
    return {
      name: 'Admin',
      nickName: '管理员',
    };
  }

  getMenuItem(item) {
    if (!item.subItems) {
      return (
        <Item key={item.key} style={{ textAlign: 'center' }}>
          {
            this.shouldShowHref(item) ? (
              <a href={item.url} target="" rel="noopener noreferrer">{item.title}</a>
            ) : <span>{item.title}</span>
          }
        </Item>
      );
    } else {
      return (
        <SubMenu className="app-nav-menu" title={item.title} key={item.key}>
          {
            item.subItems.map((subItem) => {
              return (
                <Item key={subItem.key} style={{ textAlign: 'center' }}>
                  {
                    this.shouldShowHref(subItem) ? (
                      <a href={subItem.url} target="" rel="noopener noreferrer">{subItem.title}</a>
                    ) : <span>{subItem.title}</span>
                  }
                </Item>
              );
            })
          }
        </SubMenu>
      );
    }
  }

  render() {
    const { user } = this.state;
    const { currNavMenuKeys = [], theme = 'light' } = this.props;
    const userNameDiv = <span className="submenu-title-wrapper"><Icon type="user" />{user.nickName}</span>;

    return (
      <Header
        className="header-container"
        style={{ padding: 0, marginBottom: 2, height: '50px', lineHeight: '50px' }}
      >
        <Menu
          theme={theme}
          mode="horizontal"
          defaultSelectedKeys={currNavMenuKeys}
          selectable={false}
          style={{ lineHeight: '50px' }}
        >
          <Menu.Item key="usersetting:logout" style={{ textAlign: 'left', width: 200 }}>
            <a href={'./index.html'} target="" rel="noopener noreferrer">
              <i className="app-logo"></i>
              <span className="app-title">麦哲伦风险中台</span>
            </a>
          </Menu.Item>
          {
            hearderConfig.map((item) => {
              return this.getMenuItem(item);
            })
          }
          <SubMenu title={userNameDiv} className="app-login" style={{ right: 0, position: 'absolute' }}>
            <Menu.Item key="usersetting:logout" className="app-login-submenu" style={{ textAlign: 'center' }}>退出</Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
    );
  }
}
