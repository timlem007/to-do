import React, { Component } from 'react';

import './new-task-form.css';
import PropTypes from 'prop-types';

export default class NewTaskFrom extends Component {
  state = {
    text: '',
    min: '',
    sec: '',
  };

  changeText = (event) => {
    event.preventDefault();
    this.setState({
      text: event.target.value,
    });
  };

  changeMin = (event) => {
    event.preventDefault();
    this.setState({
      min: event.target.value,
    });
  };

  changeSec = (event) => {
    event.preventDefault();
    this.setState({
      sec: event.target.value,
    });
  };

  clearState = () => {
    this.setState({ text: '', min: '', sec: '' });
  };

  render() {
    const { onSubmitChangeTask } = this.props;
    const {
      text,
      min,
      sec,
    } = this.state;

    function submitAddTask(event) {
      event.preventDefault();
      if ((text + min + sec).trim()) {
        let minOfNumber = +min;
        let secOfNumber = +sec;
        if (sec >= 60) {
          minOfNumber += Math.floor(sec / 60);
          secOfNumber %= 60;
        }
        onSubmitChangeTask(text, minOfNumber, secOfNumber);
      }
    }

    return (
      <form
        onSubmit={(event) => {
          submitAddTask(event);
          return this.clearState();
        }}
        className="new-task-el"
      >
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          type="text"
          value={text}
          onChange={this.changeText}
        />
        <input
          className="new-todo new-todo-min"
          placeholder="Min"
          type="number"
          name="min"
          value={min}
          onChange={this.changeMin}
        />
        <input
          className="new-todo new-todo-sec"
          placeholder="Sec"
          type="number"
          name="sec"
          value={sec}
          onChange={this.changeSec}
        />
        <button hidden type="submit" aria-label="submit" />
      </form>
    );
  }
}

NewTaskFrom.defaultProps = {
  onSubmitChangeTask: () => {},
};

NewTaskFrom.propTypes = {
  onSubmitChangeTask: PropTypes.func,
};
