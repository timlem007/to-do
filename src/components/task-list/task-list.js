import React from 'react';

import './task-list.css';
import PropTypes from 'prop-types';

import Task from '../task';

function TaskList({
  data, onDeleted, onTaskClick, onSubmitNewTask, clickNewTask, clickChangeTaskName, filter,
}) {
  let afterFilter;
  if (filter.all) {
    afterFilter = data.map((el) => el);
  }
  if (filter.active) {
    afterFilter = data.filter((el) => !el.active);
  }
  if (filter.unactive) {
    afterFilter = data.filter((el) => el.active);
  }

  const createLi = afterFilter.map((el) => (
    <li key={el.id}>
      <Task
        {...el}
        onDeleted={() => onDeleted(el.id)}
        onTaskClick={() => onTaskClick(el.id)}
        onSubmitNewTask={(event) => onSubmitNewTask(el.id, event)}
        clickNewTask={clickNewTask}
        clickChangeTaskName={() => clickChangeTaskName(el.id)}
        hiddenInputName={el.hiddenInputName}
        createData={el.createData}
      />
    </li>
  ));

  return <ul className="todo-list">{createLi}</ul>;
}

TaskList.defaultProps = {
  data: [],
  filter: {
    all: true,
    active: false,
    unactive: false,
  },
  todo: '',
  active: true || false,
  id: 100,
  createData: '',
  onDeleted: () => {},
  onTaskClick: () => {},
  clickNewTask: () => {},
  onSubmitNewTask: () => {},
  clickChangeTaskName: () => {},
  hiddenInputName: false,
};

TaskList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.shape(),
  todo: PropTypes.string,
  active: PropTypes.bool,
  id: PropTypes.number,
  createData: PropTypes.string,
  onDeleted: PropTypes.func,
  onTaskClick: PropTypes.func,
  clickNewTask: PropTypes.func,
  onSubmitNewTask: PropTypes.func,
  clickChangeTaskName: PropTypes.func,
  hiddenInputName: PropTypes.bool,
};

export default TaskList;
