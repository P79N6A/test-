import React, { Component } from 'react';
import EditableTable from '../Cell/EditableCellView';
import FormRegister from '../Form/FormView';
import { Steps, Button, message } from "antd";

const Step = Steps.Step;

const steps = [
  {
    title: "First",
    content: <FormView />
  },
  {
    title: "Second",
    content: <EditableCellView />
  },
  {
    title: "Last",
    content: "Last-content"
  }
];

export default class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
    this.next = this.handleSub.next(this);
    this.prev = this.handleSub.prev(this);
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}