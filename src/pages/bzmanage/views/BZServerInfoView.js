require('./BZServerInfoView.scss');
import React from 'react';
import { Row, Col } from 'antd';

const subInfoTitle = (
  <Row className="bz-server-info-view-items">
    <Col span={4} className="bz-server-info-view-item info-single">
      <span className="bz-server-info-view-label">参数</span>
    </Col>
    <Col span={5} className="bz-server-info-view-item info-single">
      <span className="bz-server-info-view-label">类型</span>
    </Col>
    <Col span={5} className="bz-server-info-view-item info-single">
      <span className="bz-server-info-view-label">是否必传</span>
    </Col>
    <Col span={5} className="bz-server-info-view-item info-single">
      <span className="bz-server-info-view-label">说明</span>
    </Col>
    <Col span={5} className="bz-server-info-view-item info-single">
      <span className="bz-server-info-view-label">备注</span>
    </Col>
  </Row>
);

const BZServerInfoView = (props) => {
  const { dataSource = {} } = props;
  const { serviceInfo = {}, serviceParams = [], bzParams = [] } = dataSource;

  return (
    <div className="bz-server-info-view-container">
      <div className="bz-server-info-view-title">服务信息</div>
      <Row className="bz-server-info-view-items">
        <Col span={8} className="bz-server-info-view-item">
          <span className="bz-server-info-view-label">线上服务地址：</span>
          <span className="bz-server-info-view-value">{serviceInfo.url}</span>
        </Col>
        <Col span={8} className="bz-server-info-view-item">
          <span className="bz-server-info-view-label">Method：</span>
          <span className="bz-server-info-view-value">{serviceInfo.method}</span>
        </Col>
        <Col span={8} className="bz-server-info-view-item">
          <span className="bz-server-info-view-label">content-Type：</span>
          <span className="bz-server-info-view-value">{serviceInfo.contentType}</span>
        </Col>
      </Row>
      <div className="bz-server-info-view-title">服务参数</div>
      {subInfoTitle}
      {
        serviceParams.map((item, idx) => (
          <Row key={`service-params-${idx}`} className="bz-server-info-view-items">
            <Col span={4} className="bz-server-info-view-item info-single">
              <span className="bz-server-info-view-label">{item.params}</span>
            </Col>
            <Col span={5} className="bz-server-info-view-item info-single">
              <span className="bz-server-info-view-label">{item.type}</span>
            </Col>
            <Col span={5} className="bz-server-info-view-item info-single">
              <span className="bz-server-info-view-label">{item.necessary ? '是' : '否'}</span>
            </Col>
            <Col span={5} className="bz-server-info-view-item info-single">
              <span className="bz-server-info-view-label">{item.desc}</span>
            </Col>
            <Col span={5} className="bz-server-info-view-item info-single">
              <span className="bz-server-info-view-label">{item.comment}</span>
            </Col>
          </Row>
        ))
      }
      <div className="bz-server-info-view-title">业务参数</div>
      {subInfoTitle}
      {
        bzParams.map((item, idx) => (
          <Row key={`bz-params-${idx}`} className="bz-server-info-view-items">
            <Col span={4} className="bz-server-info-view-item info-single">
              <span className="bz-server-info-view-label">{item.params}</span>
            </Col>
            <Col span={5} className="bz-server-info-view-item info-single">
              <span className="bz-server-info-view-label">{item.type}</span>
            </Col>
            <Col span={5} className="bz-server-info-view-item info-single">
              <span className="bz-server-info-view-label">{item.necessary ? '是' : '否'}</span>
            </Col>
            <Col span={5} className="bz-server-info-view-item info-single">
              <span className="bz-server-info-view-label">{item.desc}</span>
            </Col>
            <Col span={5} className="bz-server-info-view-item info-single">
              <span className="bz-server-info-view-label">{item.comment}</span>
            </Col>
          </Row>
        ))
      }
    </div>
  );
};

export default BZServerInfoView;
