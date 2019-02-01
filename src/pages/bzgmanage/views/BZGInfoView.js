require('./BZGInfoView.scss');
import React from 'react';
import { Row, Col } from 'antd';
import utils from '../../../common/utils';

const BZGInfoView = (props) => {
  const {
    className = '',
    dataSource = {},
  } = props;

  const {
    groupId,
    groupEnName,
    groupName,
    remark,
    createTime,
    updateTime,
  } = dataSource;

  const formattedCreateTime = utils.formattedDate(createTime);
  const formattedUpdateTime = utils.formattedDate(updateTime);

  return (
    <div className={`bzg-info-view-container ` + className}>
      <div className="bzg-info-view-title">业务组信息</div>
      <Row className="bzg-info-view-items">
        <Col span={12} className="bzg-info-view-item">
          <span className="bzg-info-view-label">业务组ID：</span>
          <span className="bzg-info-view-value">{groupId}</span>
        </Col>
        <Col span={12} className="bzg-info-view-item">
          <span className="bzg-info-view-label">业务组英文名：</span>
          <span className="bzg-info-view-value">{groupEnName}</span>
        </Col>
      </Row>
      <Row className="bzg-info-view-items">
        <Col span={12} className="bzg-info-view-item">
          <span className="bzg-info-view-label">业务组名称：</span>
          <span className="bzg-info-view-value">{groupName}</span>
        </Col>
        <Col span={12} className="bzg-info-view-item">
          <span className="bzg-info-view-label">业务组描述：</span>
          <span className="bzg-info-view-value">{remark}</span>
        </Col>
      </Row>
      <Row className="bzg-info-view-items">
        <Col span={12} className="bzg-info-view-item">
          <span className="bzg-info-view-label">创建时间：</span>
          <span className="bzg-info-view-value">{formattedCreateTime}</span>
        </Col>
        <Col span={12} className="bzg-info-view-item">
          <span className="bzg-info-view-label">最后更新时间：</span>
          <span className="bzg-info-view-value">{formattedUpdateTime}</span>
        </Col>
      </Row>
    </div>
  );
};

export default BZGInfoView;
