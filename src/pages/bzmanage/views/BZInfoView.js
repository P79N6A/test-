require('./BZInfoView.scss');
import React from 'react';
import { Row, Col } from 'antd';
import utils from '../../../common/utils';

const BZInfoView = (props) => {
  const {
    className = '',
    dataSource = {},
  } = props;

  const {
    bzNum,
    bzName,
    desc,
    bzGroup,
    sence,
    applyTime,
  } = dataSource;

  const formattedDate = utils.formattedDate(applyTime);

  return (
    <div className={`bz-info-view-container ` + className}>
      <div className="bz-info-view-title">业务信息</div>
      <Row className="bz-info-view-items">
        <Col span={8} className="bz-info-view-item">
          <span className="bz-info-view-label">业务编号：</span>
          <span className="bz-info-view-value">{bzNum}</span>
        </Col>
        <Col span={8} className="bz-info-view-item">
          <span className="bz-info-view-label">业务名称：</span>
          <span className="bz-info-view-value">{bzName}</span>
        </Col>
        <Col span={8} className="bz-info-view-item">
          <span className="bz-info-view-label">业务描述：</span>
          <span className="bz-info-view-value">{desc}</span>
        </Col>
      </Row>
      <Row className="bz-info-view-items">
        <Col span={8} className="bz-info-view-item">
          <span className="bz-info-view-label">所属业务组：</span>
          <span className="bz-info-view-value">{bzGroup}</span>
        </Col>
        <Col span={8} className="bz-info-view-item">
          <span className="bz-info-view-label">场景：</span>
          <span className="bz-info-view-value">{sence}</span>
        </Col>
        <Col span={8} className="bz-info-view-item">
          <span className="bz-info-view-label">申请时间：</span>
          <span className="bz-info-view-value">{formattedDate}</span>
        </Col>
      </Row>
    </div>
  );
};

export default BZInfoView;
