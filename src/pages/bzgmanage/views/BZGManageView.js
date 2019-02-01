require('./BZGManageView.scss');
import React, { Component } from 'react';
import { Button, Divider, Spin, Popover, Icon, notification as Notification } from 'antd';

import BZGManageAction from '../actions/BZGManageAction';

import PageContentView from '../../../common/components/PageContentView';
import UserInfoContainerView from '../../../common/components/UserInfoContainerView';
import UserItemEditorView from '../../../common/components/UserItemEditorView';
import BZGInfoView from './BZGInfoView';

import utils from '../../../common/utils';
import SliderConfig from '../../../configs/sliderConfig';
import RoleType from '../../../common/constants/RoleType';

export default class BZGManageView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      userEditable: false,
      hasWorkOrder: false, //当前业务是否有进行中的工单
    };

    this.params = utils.getParamsFromUrl();
    this.bzgId = this.params.bzgId;

    this.bzgInfo = {};
    this.allBZUsers = [];

    this._ownerSelector = undefined;
    this._managerSelector = undefined;
    this._memberSelector = undefined;

    this._handleStartUserEdit = this._handleStartUserEdit.bind(this);
    this._handleCancelUserEdit = this._handleCancelUserEdit.bind(this);
    this._handleResetUsers = this._handleResetUsers.bind(this);
    this._handleSubmitUsers = this._handleSubmitUsers.bind(this);
  }

  componentDidMount() {
    this.getBZGInfo();
  }

  _handleStartUserEdit() {
    this.setState({
      userEditable: true,
    });
  }

  _handleCancelUserEdit() {
    this.resetSelectedUsers();
    this.setState({
      userEditable: false,
    });
  }

  _handleResetUsers() {
    this.resetSelectedUsers();
  }

  resetSelectedUsers() {
    const { roleMembers = [] } = this.bzgInfo;

    this._ownerSelector.setSelected(roleMembers[0]);
    this._managerSelector.setSelected(roleMembers[1]);
    this._memberSelector.setSelected(roleMembers[2]);
  }

  _handleSubmitUsers() {

    const owners = this._ownerSelector.getSelected();
    const managers = this._managerSelector.getSelected();
    const members = this._memberSelector.getSelected();

    console.log(this.bzgId, owners, managers, members);

    // TODO: send data to server
    const sendDataToServer = () => {
      return new Promise((resolve, reject) => {
        if (Math.random() * 10 > 5) {
          resolve('12345');
        } else {
          reject('mock error');
        }
      });
    };
    const notifKey = 'apply_join_BZG_notif_key';

    sendDataToServer()
      .then(res => {
        Notification.close(notifKey);
        Notification.success({
          key: notifKey,
          duration: 0,
          message: <div>提交成功，工单编号为<span style={{ marginLeft: 10, color: '#1890ff' }}>{res}</span></div>,
        });
        this._userInfoContainerView.setEditState(false);
        this.setState({
          userEditable: false,
          hasWorkOrder: true,
        });
        // TODO:  拉是否有工单
      })
      .catch(err => {
        console.log(err);
        Notification.close(notifKey);
        Notification.error({
          key: notifKey,
          duration: 0,
          message: <div>服务器异常，请稍候重试</div>,
        });
      });
  }

  getBZGInfo() {
    this.setState({
      loading: true,
    });

    const getDataP = [];
    getDataP.push(BZGManageAction.getBZGInfo(this.bzgId));
    getDataP.push(BZGManageAction.getAllUsers(this.bzgId));

    Promise.all(getDataP)
      .then(res => {
        console.log(res);
        this.allBZUsers = res[1];
        this.bzgInfo = res[0];

        this.resetSelectedUsers();
        this.setState({
          loading: false,
          hasWorkOrder: false, // TODO:
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
        });
      });
  }

  getGroupHeaderTips(href = 'javascript: void(0)') {
    // 显示Header提示信息(有工单，无工单)
    const { hasWorkOrder } = this.state;
    let groupHeaderTipsEle;

    if (hasWorkOrder) {
      groupHeaderTipsEle = (
        <div style={{ color: 'red' }}>
          <Icon type="info-circle" style={{ marginRight: 5 }} />
          <a href={href} style={{ color: 'red' }}>您还有正在进行的工单，请点击查看</a>
        </div>
      );
    } else {
      const roleTypeTip = (
        <div style={{ fontSize: 12 }}>
          <div>项目owner：最高操作权限</div>
          <div>项目管理员：最高操作权限，操作需owner审批</div>
        </div>
      );
      groupHeaderTipsEle = (
        <Popover
          className="role-tips"
          trigger="hover"
          content={roleTypeTip}
          placement="right"
        >
          <Icon type="info-circle" />
        </Popover>
      );
    }

    return groupHeaderTipsEle;
  }

  render() {
    const { loading, hasWorkOrder, userEditable } = this.state;

    const bzgInfo = this.bzgInfo;
    const { roleMembers = [] } = bzgInfo;

    const myRole = RoleType.MANAGER; // TODO:
    const ownerSelectDisabled = !(userEditable && myRole === RoleType.OWNER);
    const managerSelectDisabled = !(userEditable && (myRole === RoleType.OWNER || myRole === RoleType.MANAGER));
    const memberSelectDisabled = managerSelectDisabled;

    return (
      <PageContentView headerMenuKeys={['ywzlb']} sliderMenuKeys={['ywzlb']} sliderConfig={SliderConfig.bzGroup}>
        <Spin
          delay={500}
          spinning={loading}
        >
          <div className="page-title">
            <h2 className="bzg-name">{bzgInfo.groupName}</h2>
            <a className="bzg-back" href="./bzgroup.html">{`<< 返回业务组列表`}</a>
          </div>
          <div>
            <Divider orientation="left"></Divider>
          </div>
          <BZGInfoView dataSource={bzgInfo}/>
          <Divider orientation="left" style={{ marginTop: 32 }}>业务成员信息</Divider>
          <UserInfoContainerView
            ref={_ => this._userInfoContainerView = _}
            headerText="成员信息"
            subHeader={this.getGroupHeaderTips()}
            hideEditBtn={hasWorkOrder}
            onStartEdit={this._handleStartUserEdit}
            onCancelEdit={this._handleCancelUserEdit}
          >
            <UserItemEditorView
              ref={_ => this._ownerSelector = _}
              label="owner"
              tipInfo="owner可修改"
              disabled={ownerSelectDisabled}
              defaultSelected={roleMembers[0]}
              dataSource={this.allBZUsers}
            />
            <UserItemEditorView
              ref={_ => this._managerSelector = _}
              label="管理员"
              tipInfo="owner和管理员可修改"
              disabled={managerSelectDisabled}
              defaultSelected={roleMembers[1]}
              dataSource={this.allBZUsers}
            />
            <UserItemEditorView
              ref={_ => this._memberSelector = _}
              label="成员"
              tipInfo="owner和管理员可修改"
              disabled={memberSelectDisabled}
              defaultSelected={roleMembers[2]}
              dataSource={this.allBZUsers}
            />
            {
              userEditable ? (
                <div className="group-opts-container">
                  <Button className="group-reset-btn" onClick={this._handleResetUsers}>重置</Button>
                  <Button className="group-submit-btn" onClick={this._handleSubmitUsers} type="primary">提交申请</Button>
                  <div className="group-submit-btn-info">
                    <Icon type="info-circle" style={{ marginRight: 5 }} />
                    修改内容需要(项目)审批
                  </div>
                </div>
              ) : undefined
            }

          </UserInfoContainerView>
        </Spin>
      </PageContentView>
    );
  }
}
