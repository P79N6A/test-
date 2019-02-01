import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import SliderConfig from '../../configs/sliderConfig';

const { SubMenu, Item } = Menu;
const { Sider } = Layout;

export default class SliderMenuView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currMenuKey: this.props.sliderMenuKey,
    };

    this._handleMemuItemClick = this._handleMemuItemClick.bind(this);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _handleMemuItemClick(item) {
    const { sliderMenuKeys = [] } = this.props;
    if (!item.url) {
      return;
    }
    const currPageKeys = sliderMenuKeys.filter((k) => {
      return k === item.key;
    });
    if (currPageKeys.length > 0) {
      return;
    }
    window.location.href = item.url;
  }

  /**
   * 获取要展开的一级菜单；如果当前选中的菜单为二级菜单时，展开以及菜单
   */
  getItemOpenKeys(items) {
    const { sliderMenuKeys = [] } =  this.props;
    const openKeys = [];
    for (let item of items) {
      if (!item.subItems) {
        continue;
      }
      const hits = item.subItems.filter(si => sliderMenuKeys.indexOf(si.key) !== -1);
      if (hits.length > 0) {
        openKeys.push(item.key);
      }
    }
    return openKeys;
  }

  getMenuItem(item) {
    const { iconDisplay = false } = this.props;
    if (!item.subItems) {
      return (
        <Item key={item.key} title={item.title} onClick={() => this._handleMemuItemClick(item)}>
          <span>
            {iconDisplay ? <Icon type={item.icon} /> : undefined}
            {item.title}
          </span>
        </Item>
      );
    } else {
      const subMenuTile = (
        <span>
          {item.title}
          {iconDisplay ? <Icon type={item.icon} /> : undefined}
        </span>
      );
      return (
        <SubMenu key={item.key} title={subMenuTile}>
          {
            item.subItems.map((subItem) => {
              return (
                <Item key={subItem.key} title={item.title} onClick={() => this._handleMemuItemClick(subItem)}>
                  <span>
                    {iconDisplay ? <Icon type={subItem.icon} /> : undefined}
                    {subItem.title}
                  </span>
                </Item>
              );
            })
          }
        </SubMenu>
      );
    }
  }

  render () {
    const { sliderMenuKeys = [], theme = 'light', sliderConfig = SliderConfig.bz } = this.props;
    return (
      <Sider width={160} style={{ background: '#fff' }}>
        <Menu
          theme={theme}
          mode="inline"
          defaultOpenKeys={this.getItemOpenKeys(sliderConfig)}
          defaultSelectedKeys={sliderMenuKeys}
          selectable={false}
          style={{ height: '100%', borderRight: 0 }}
        >
          {
            sliderConfig.map((item) => {
              return this.getMenuItem(item);
            })
          }
        </Menu>
      </Sider>
    );
  }
}
