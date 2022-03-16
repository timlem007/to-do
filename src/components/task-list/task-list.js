import React from 'react';

import './task-list.css';
import PropTypes from 'prop-types';

import Task from '../task';

function TaskList({
  data,
  onDeleted,
  onTaskClick,
  submitChangeTask,
  clickNewTask,
  clickChangeTaskName,
  filter,
  timerPlay,
  timerStop,
  clickChangeMin,
  clickChangeSec,
}) {
  let afterFilter;
  if (filter === 'all') {
    afterFilter = data.map((el) => el);
  }
  if (filter === 'active') {
    afterFilter = data.filter((el) => !el.active);
  }
  if (filter === 'completed') {
    afterFilter = data.filter((el) => el.active);
  }

  const createLi = afterFilter.map((el) => (
    <li key={el.id}>
      <Task
        data={el}
        onDeleted={() => onDeleted(el.id)}
        onTaskClick={(event) => onTaskClick(el.id, event)}
        submitChangeTask={submitChangeTask}
        clickNewTask={(event) => clickNewTask(el.id, event)}
        clickChangeTaskName={() => clickChangeTaskName(el.id)}
        timerPlay={(event) => timerPlay(el.id, event)}
        timerStop={(event) => timerStop(el.id, event)}
        // hiddenInputName={el.hiddenInputName}
        // createData={el.createData}
        // timerOn={el.timerOn}
        // timerMin={el.min}
        // timerSec={el.sec}
        clickChangeMin={(event) => clickChangeMin(el.id, event)}
        clickChangeSec={(event) => clickChangeSec(el.id, event)}
      />
    </li>
  ));

  return <ul className="todo-list">{createLi}</ul>;
}

TaskList.defaultProps = {
  data: [],
  filter: 'all',
  // todo: '',
  // active: true || false,
  // id: 100,
  // createData: '',
  // hiddenInputName: false,
  timerPlay: () => {},
  timerStop: () => {},
  onDeleted: () => {},
  onTaskClick: () => {},
  clickNewTask: () => {},
  submitChangeTask: () => {},
  clickChangeTaskName: () => {},
  clickChangeMin: () => {},
  clickChangeSec: () => {},
};

TaskList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
  // todo: PropTypes.string,
  // active: PropTypes.bool,
  // id: PropTypes.number,
  // createData: PropTypes.string,
  // hiddenInputName: PropTypes.bool,
  timerPlay: PropTypes.func,
  timerStop: PropTypes.func,
  onDeleted: PropTypes.func,
  onTaskClick: PropTypes.func,
  clickNewTask: PropTypes.func,
  submitChangeTask: PropTypes.func,
  clickChangeTaskName: PropTypes.func,
  clickChangeMin: PropTypes.func,
  clickChangeSec: PropTypes.func,
};

export default TaskList;
