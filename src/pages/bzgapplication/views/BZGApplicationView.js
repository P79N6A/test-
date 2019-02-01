require('./BZGApplicationView.scss');
import React, { Component } from 'react';
import { Button, Divider, Steps, message as Message } from 'antd';

import PageContentView from '../../../common/components/PageContentView';
import SliderConfig from '../../../configs/sliderConfig';
import BZGInfoView from './BZGInfoView';

import utils from '../../../common/utils';

const { Step } = Steps;

export default class BZGApplicationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currStep: 0,
      loading: false,

      applyTitle: '',
      bzNmae: '',
      bzDesc: '',

    };
    this.params = utils.getParamsFromUrl();
    this.bzId = this.params.bzId;

    this._handleTitleChange = this._handleTitleChange.bind(this);
    this._handleBZNameChange = this._handleBZNameChange.bind(this);
    this._handleBZDescChange = this._handleBZDescChange.bind(this);
  }
  componentDidMount() {
    this.getBZInfo();
  }
  getBZInfo() {

  }

  _handleNextStep() {
    let { currStep } = this.state;
    currStep ++;
    this.setState({ currStep });
  }
  
  _handlePrevStep() {
    let { currStep } = this.state;
    currStep --;
    this.setState({ currStep });
  }

  _handleTitleChange(value) {
    this.setState({
      applyTitle: value,
    });
  }

  _handleBZNameChange(value) {
    this.setState({
      bzName: value,
    });
  }

  _handleBZDescChange(value) {
    this.setState({
      bzDesc: value,
    });
  }

  getStepConfigView() {
    const {
      applyTitle,
      bzName,
      bzDesc,
    } = this.state;
    const stepConfig = [];
    const bzInfoStep = {
      key: 'bzgInfo',
      title: '业务组信息',
    };
    bzInfoStep.content = (
      <BZGInfoView 
        bzId={this.bzId}

        title={applyTitle}
        onTitleChange={this._handleTitleChange}

        bzName={bzName}
        onBZNameChange={this._handleBZNameChange}

        bzDesc={bzDesc}
        onBZDescChange={this._handleBZDescChange}
      />
    );
    stepConfig.push(bzInfoStep);

    const memberInfoStep = {
      key: 'memberInfo',
      title: '成员信息',
      content: '2',
    };
    stepConfig.push(memberInfoStep);

    const completeStep = {
      key: 'complete',
      title: '完成',
      content: '3',
    };
    stepConfig.push(completeStep);

    return stepConfig;
  }

  render() {
    const { currStep } = this.state;

    const stepViewConfig = this.getStepConfigView();

    return (
      <PageContentView headerMenuKeys={['sqywz']} sliderMenuKeys={['sqyw']} sliderConfig={SliderConfig.bz} >
        <h2>申请业务组</h2>
        <div>
          <Divider orientation="left"></Divider>
        </div>
        <div className="bz-application-view-container">
          <div className="steps-status-container">
            <Steps current={currStep}>
              {
                stepViewConfig.map(item => (
                  <Step key={item.key} title={item.title} />
                ))
              }
            </Steps>
          </div>
          <div className="steps-content-container">
            {
              stepViewConfig[currStep].content
            }
          </div>
          <div className="steps-action-container">
            <Button
              className="steps-btn-pre"
              disabled={currStep === 0}
              onClick={() => this._handlePrevStep()}
            >
              上一步
            </Button>
            {
              currStep < stepViewConfig.length - 1 ? (
                <Button
                  className="steps-btn-next"
                  type="primary"
                  onClick={() => this._handleNextStep()}
                >
                  下一步
                </Button>
              ) : (
                <Button
                  className="steps-btn-submit"
                  type="primary"
                  onClick={() => Message.success('Processing complete!')}
                >
                  提交
                </Button>
              )
            }
          </div>
        </div>
      </PageContentView>
      
    );
  }
}