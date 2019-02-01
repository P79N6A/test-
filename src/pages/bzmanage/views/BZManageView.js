require('./BZManageView.scss');
import React, { Component } from 'react';
import { Button, Divider, Spin, Popover, Icon, notification as Notification } from 'antd';

import BZManageAction from '../actions/BZManageAction';

import PageContentView from '../../../common/components/PageContentView';
import UserInfoContainerView from '../../../common/components/UserInfoContainerView';
import UserItemEditorView from '../../../common/components/UserItemEditorView';
import BZServerInfoView from './BZServerInfoView';
import BZInfoView from './BZInfoView';

import SliderConfig from '../../../configs/sliderConfig';
import utils from '../../../common/utils';
import RoleType from '../../../common/constants/RoleType';


export default class BZManageView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      bzInfo: {},
      bzServiceInfo: {},
      userEditable: false,
      hasWorkOrder: false, //当前业务是否有进行中的工单
    };

    this.params = utils.getParamsFromUrl();
    this.bzId = this.params.bzId;
    this.allBZUsers = [];

    this._ownerSelector = undefined;
    this._managerSelector = undefined;
    this._memberSelector = undefined;
    this._userInfoContainerView = undefined;

    this._handleStartUserEdit = this._handleStartUserEdit.bind(this);
    this._handleCancelUserEdit = this._handleCancelUserEdit.bind(this);
    this._handleResetUsers = this._handleResetUsers.bind(this);
    this._handleSubmitUsers = this._handleSubmitUsers.bind(this);
  }

  componentDidMount() {
    this.getBZInfo();
  }

  getBZInfo() {
    this.setState({
      loading: true,
    });
    const getDataP = [];
    getDataP.push(BZManageAction.getBZInfo(this.bzId));
    getDataP.push(BZManageAction.getBZServiceInfo(this.bzId));
    getDataP.push(BZManageAction.getAllUsersByBZId(this.bzId));
    Promise.all(getDataP)
      .then(res => {
        this.allBZUsers = res[2];
        this.setState({
          loading: false,
          bzInfo: res[0],
          bzServiceInfo: res[1],
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

  _handleStartUserEdit() {
    this.setState({
      userEditable: true,
    });
  }

  _handleCancelUserEdit() {
    this.setState({
      userEditable: false,
    });
  }

  _handleResetUsers() {

  }

  _handleSubmitUsers() {
    const owners = this._ownerSelector.getSelected();
    const managers = this._managerSelector.getSelected();
    const members = this._memberSelector.getSelected();

    console.log(this.bzId, owners, managers, members);

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
    const notifKey = 'apply_join_BZ_notif_key';

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

  getUserHeaderTips(href = 'javascript: void(0)') {
    // 显示Header提示信息(有工单，无工单)
    const { hasWorkOrder } = this.state;
    let userHeaderTipsEle;

    if (hasWorkOrder) {
      userHeaderTipsEle = (
        <div style={{ color: 'red' }}>
          <Icon type="info-circle" style={{ marginRight: 5 }} />
          <a href={href} style={{ color: 'red' }}>您还有正在进行的工单，请点击查看</a>
        </div>
      );
    } else {
      const roleTypeTip = (
        <div style={{ fontSize: 12 }}>
          <div>项目owner：最高操作权限，负责业务内操作工单审批</div>
          <div>项目管理员：最高操作权限，操作需owner审批</div>
          <div>开发成员：查看服务信息、处罚中心、规则查看，操作需owner审批</div>
          <div>运营成员：风险大盘、处罚中心、规则读写，操作需owner审批</div>
          <div>客服成员：处罚中心、反馈中心，操作需owner审批</div>
        </div>
      );
      userHeaderTipsEle = (
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

    return userHeaderTipsEle;
  }

  render() {
    const { loading, bzInfo, bzServiceInfo, userEditable, hasWorkOrder } = this.state;

    const myRole = RoleType.MANAGER; // TODO:
    const ownerSelectDisabled = !(userEditable && myRole === RoleType.OWNER);
    const managerSelectDisabled = !(userEditable && (myRole === RoleType.OWNER || myRole === RoleType.MANAGER));
    const memberSelectDisabled = managerSelectDisabled;
    return (
      <PageContentView headerMenuKeys={['ywlb']} sliderMenuKeys={['ywlb']} sliderConfig={SliderConfig.bz}>
        <Spin
          delay={500}
          spinning={loading}
        >
          <div className="page-title">
            <h2 className="bz-desc">{bzInfo.desc}</h2>
            <a className="bz-back" href="./business.html">{`<< 返回业务列表`}</a>
          </div>
          <div>
            <Divider orientation="left"></Divider>
          </div>
          <BZInfoView dataSource={bzInfo}/>
          <Divider orientation="left" style={{ marginTop: 32 }}>业务成员信息</Divider>
          <UserInfoContainerView
            ref={_ => this._userInfoContainerView = _}
            headerText="成员信息"
            subHeader={this.getUserHeaderTips()}
            hideEditBtn={hasWorkOrder}
            onStartEdit={this._handleStartUserEdit}
            onCancelEdit={this._handleCancelUserEdit}
          >
            <UserItemEditorView
              ref={_ => this._ownerSelector = _}
              label="项目owner"
              tipInfo="owner可修改"
              disabled={ownerSelectDisabled}
              defaultSelected={[]}
              dataSource={this.allBZUsers}
            />
            <UserItemEditorView
              ref={_ => this._managerSelector = _}
              label="项目管理员"
              tipInfo="owner和管理员可修改"
              disabled={managerSelectDisabled}
              defaultSelected={[]}
              dataSource={this.allBZUsers}
            />
            <UserItemEditorView
              ref={_ => this._memberSelector = _}
              label="项目成员"
              tipInfo="owner和管理员可修改"
              disabled={memberSelectDisabled}
              defaultSelected={[]}
              dataSource={this.allBZUsers}
            />
            {
              userEditable ? (
                <div className="user-opts-container">
                  <Button className="user-reset-btn" onClick={this._handleResetUsers}>重置</Button>
                  <Button className="user-submit-btn" onClick={this._handleSubmitUsers} type="primary">提交申请</Button>
                  <div className="user-submit-btn-info">
                    <Icon type="info-circle" style={{ marginRight: 5 }} />
                    修改内容需要(项目)审批
                  </div>
                </div>
              ) : undefined
            }
          </UserInfoContainerView>
          <Divider orientation="left" style={{ marginTop: 48 }}>服务接入信息</Divider>
          <BZServerInfoView dataSource={bzServiceInfo} />
        </Spin>
      </PageContentView>
    );
  }
}
