require('./BZApplicationView.scss');
import React, { Component } from 'react';
import { Button, Divider, Steps, message as Message } from 'antd';

import PageContentView from '../../../common/components/PageContentView';
import BZInfoView from './BZInfoView';
// import FormRegister from '../yewuform/BZForm.js';
// import EditableTable from './EditableCellView';

import BZApplicationAction from '../actions/BZApplicationAction';

import utils from '../../../common/utils';
import SliderConfig from '../../../configs/sliderConfig';

const { Step } = Steps;

export default class BusinessView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currStep: 0,
      loading: false,

      applyTitle: '',
      bzName: '',
      bzDesc: '',
      maxQps: '',
      avgQps: '',
      emailcc: '',

      selectedBZGroup: '',
      bzGroupDataSource: [],

      selectedSence: '',
      senceDataSource: [],

      selectedMode: '',
      modeDataSource: [],

      selectedServers: [],
      serversDataSource: [],


    };

    this.params = utils.getParamsFromUrl();
    this.bzId = this.params.bzId;

    this._handleTitleChange = this._handleTitleChange.bind(this);
    this._handleBZNameChange = this._handleBZNameChange.bind(this);
    this._handleBZDescChange = this._handleBZDescChange.bind(this);
    this._handleMaxQpsChange = this._handleMaxQpsChange.bind(this);
    this._handleAvgQpsChange = this._handleAvgQpsChange.bind(this);
    this._handleEmailccQpsChange = this._handleEmailccQpsChange.bind(this);

    this._handleBZGChange = this._handleBZGChange.bind(this);
    this._handleSenceChange = this._handleSenceChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSelectedServersChange = this._handleSelectedServersChange.bind(this);
  }

  componentDidMount() {
    this.getBZInfo();
  }

  getBZInfo() {
    this.setState({
      loading: true,
    });
    const getDataP = [];
    getDataP.push(BZApplicationAction.getAllBZGList());
    getDataP.push(BZApplicationAction.getSenceDataSource());
    getDataP.push(BZApplicationAction.getModeDataSource());
    getDataP.push(BZApplicationAction.getServersList());
    Promise.all(getDataP)
      .then(res => {
        const bzGroupDataSource = res[0];
        const senceDataSource = res[1];
        const modeDataSource = res[2];
        const serversDataSource = res[3];
        console.log(bzGroupDataSource);
        this.setState({
          loading: false,
          bzGroupDataSource,
          senceDataSource,
          modeDataSource,
          serversDataSource,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
        });
      });
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

  _handleMaxQpsChange(value) {
    this.setState({
      maxQps: value,
    });
  }

  _handleAvgQpsChange(value) {
    this.setState({
      avgQps: value,
    });
  }

  _handleEmailccQpsChange(value) {
    this.setState({
      emailcc: value,
    });
  }


  _handleBZGChange(value) {
    this.setState({
      selectedBZGroup: value,
    });
  }

  _handleSenceChange(value) {
    this.setState({
      selectedSence: value,
    });
  }

  _handleModeChange(value) {
    this.setState({
      selectedMode: value,
    });
  }

  _handleSelectedServersChange(value) {
    this.setState({
      selectedServers: value,
    });
  }

  getStepConfigView() {
    const {
      applyTitle,
      bzName,
      bzDesc,
      maxQps,
      avgQps,
      emailcc,

      selectedBZGroup,
      bzGroupDataSource,

      selectedSence,
      senceDataSource,

      selectedMode,
      modeDataSource,

      selectedServers,
      serversDataSource,
    } = this.state;

    const stepConfig = [];
    const bzInfoStep = {
      key: 'bzInfo',
      title: '业务信息',
    };
    bzInfoStep.content = (
      <BZInfoView
        bzId={this.bzId}

        title={applyTitle}
        onTitleChange={this._handleTitleChange}

        bzName={bzName}
        onBZNameChange={this._handleBZNameChange}

        bzDesc={bzDesc}
        onBZDescChange={this._handleBZDescChange}

        maxQps={maxQps}
        onMaxQpsChange={this._handleMaxQpsChange}

        avgQps={avgQps}
        onAvgQpsChange={this._handleAvgQpsChange}

        emailcc={emailcc}
        onEmailccChange={this._handleEmailccQpsChange}

        selectedBZGroup={selectedBZGroup}
        bzGroupDataSource={bzGroupDataSource}
        onBZGChange={this._handleBZGChange}

        selectedSence={selectedSence}
        senceDataSource={senceDataSource}
        onSenceChange={this._handleSenceChange}

        selectedMode={selectedMode}
        modeDataSource={modeDataSource}
        onModeChange={this._handleModeChange}

        selectedServers={selectedServers}
        serversDataSource={serversDataSource}
        onServersSelected={this._handleSelectedServersChange}
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
      <PageContentView headerMenuKeys={['sqyw']} sliderMenuKeys={['sqyw']} sliderConfig={SliderConfig.bz} >
        <h2>申请业务</h2>
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
