import React, { Component } from 'react';

import './aрр.css';

import Footer from '../footer';
import NewTaskFrom from '../new-task-form';
import TaskList from '../task-list';

export default class Aрр extends Component {
  maxId = 100;

  state = {
    taskLists: [],
    filter: 'all',
    changeTaskForm: '',
    timerMin: '',
    timerSec: '',
    sessionTime: 0,
  };

  componentDidMount() {
    setInterval(() => this.setState(({ sessionTime }) => {
      let newTimer = sessionTime;
      newTimer += 1;
      return {
        sessionTime: newTimer,
      };
    }), 1000);
  }

  deleteTast = (id) => {
    this.setState(({ taskLists }) => {
      const idx = taskLists.findIndex((el) => el.id === id);

      const newArray = [...taskLists.slice(0, idx), ...taskLists.slice(idx + 1)];

      return {
        taskLists: newArray,
      };
    });
  };

  onSubmitChangeTask = (event) => {
    event.preventDefault();
    let min = +event.target.min.value;
    let sec = +event.target.sec.value;
    if (sec > 60) sec = 60;
    if (min > 60) {
      min = 60;
      sec = 0;
    }
    this.setState(({ changeTaskForm, taskLists }) => {
      const newTask = this.createTask(changeTaskForm, min, sec);
      const newArray = [...taskLists, newTask];

      return {
        taskLists: newArray,
        changeTaskForm: '',
        timerMin: '',
        timerSec: '',
      };
    });
  };

  clickChangeTask = (event) => {
    this.setState(() => ({
      changeTaskForm: event.target.value,
    }));
  };

  clickChangeMin = (event) => {
    this.setState(() => ({
      timerMin: event.target.value,
    }));
  };

  clickChangeSec = (event) => {
    this.setState(() => ({
      timerSec: event.target.value,
    }));
  };

  onTaskClick = (id) => {
    this.setState(({ taskLists }) => {
      const idx = taskLists.findIndex((el) => el.id === id);
      const newArray = [...taskLists.slice()];

      newArray[idx].active = !newArray[idx].active;
      return {
        taskLists: newArray,
      };
    });
  };

  clickChangeTaskName = (id) => {
    this.setState(({ taskLists }) => {
      const idx = taskLists.findIndex((el) => el.id === id);
      const newArray = [...taskLists.slice()];

      newArray[idx].hiddenInputName = !newArray[idx].hiddenInputName;

      return {
        taskLists: newArray,
      };
    });
  };

  clickNewTask = (id, event) => {
    this.setState(({ taskLists }) => {
      const idx = taskLists.findIndex((el) => el.id === id);
      const newArray = [...taskLists.slice()];

      newArray[idx].todo = event.target.value;
      return {
        taskLists: newArray,
      };
    });
  };

  clickNewMin = (id, event) => {
    this.setState(({ taskLists }) => {
      const idx = taskLists.findIndex((el) => el.id === id);
      const newArray = [...taskLists.slice()];

      newArray[idx].min = event.target.value;
      return {
        taskLists: newArray,
      };
    });
  };

  clickNewSec = (id, event) => {
    this.setState(({ taskLists }) => {
      const idx = taskLists.findIndex((el) => el.id === id);
      const newArray = [...taskLists.slice()];

      newArray[idx].sec = event.target.value;
      return {
        taskLists: newArray,
      };
    });
  };

  onSubmitNewTask = (id, event) => {
    event.preventDefault();
    this.setState(({ taskLists }) => {
      const idx = taskLists.findIndex((el) => el.id === id);
      const clone = [...taskLists.slice()];

      clone[idx].hiddenInputName = false;
      clone[idx].createData = new Date();
      if (clone[idx].sec > 60) clone[idx].sec = 60;
      if (clone[idx].min > 60) {
        clone[idx].min = 60;
        clone[idx].sec = 0;
      }

      const newArray = [...clone.slice(0, idx), clone[idx], ...clone.slice(idx + 1)];

      return {
        taskLists: newArray,
      };
    });
  };

  footerFilterButtons = (text) => {
    this.setState(() => {
      const filterNewArray = text;
      return {
        filter: filterNewArray,
      };
    });
  };

  deleleCompletedTasks = () => {
    this.setState(({ taskLists }) => {
      const newArray = taskLists.filter((el) => !el.active);

      return {
        taskLists: newArray,
      };
    });
  };

  timerPlay = (id, event) => {
    event.stopPropagation();
    event.preventDefault();
    this.setState(({ taskLists, sessionTime }) => {
      const idx = taskLists.findIndex((el) => el.id === id);
      const newArray = [...taskLists.slice()];
      let timer = (newArray[idx].min * 60) + newArray[idx].sec;
      if (!newArray[idx].timerOn && timer !== 0) {
        timer = sessionTime + timer;
        newArray[idx].min = Math.floor(timer / 60);
        newArray[idx].sec = timer % 60;
        newArray[idx].timerOn = true;
      }
      return {
        taskLists: newArray,
      };
    });
  };

  timerStop = (id, event) => {
    event.stopPropagation();
    event.preventDefault();
    this.setState(({ taskLists, sessionTime }) => {
      const idx = taskLists.findIndex((el) => el.id === id);
      const newArray = [...taskLists.slice()];
      let timer = (newArray[idx].min * 60) + newArray[idx].sec;
      if (newArray[idx].timerOn && newArray[idx].timer !== 0) {
        timer -= sessionTime;
        newArray[idx].min = Math.floor(timer / 60);
        newArray[idx].sec = timer % 60;
        newArray[idx].timerOn = false;
      }
      return {
        taskLists: newArray,
      };
    });
  };

  createTask(name, min, sec) {
    this.maxId += 1;
    return {
      todo: name,
      active: false,
      id: (this.maxId),
      hiddenInputName: false,
      createData: new Date(),
      min,
      sec,
      timerOn: false,
    };
  }

  render() {
    const {
      taskLists, filter,
      changeTaskForm, sessionTime,
      timerOn, timerMin, timerSec,
    } = this.state;
    const todoCount = taskLists.filter((el) => !el.active);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskFrom
            onSubmitChangeTask={this.onSubmitChangeTask}
            changeTaskForm={changeTaskForm}
            clickChangeTask={this.clickChangeTask}
            clickChangeMin={this.clickChangeMin}
            clickChangeSec={this.clickChangeSec}
            timerMin={timerMin}
            timerSec={timerSec}
          />
        </header>
        <section className="main">
          <TaskList
            data={taskLists}
            onDeleted={this.deleteTast}
            onTaskClick={this.onTaskClick}
            onSubmitNewTask={this.onSubmitNewTask}
            clickNewTask={this.clickNewTask}
            clickChangeTaskName={this.clickChangeTaskName}
            filter={filter}
            timerPlay={this.timerPlay}
            sessionTime={sessionTime}
            timerOn={timerOn}
            timerStop={this.timerStop}
            timerMin={timerMin}
            timerSec={timerSec}
            clickChangeMin={this.clickNewMin}
            clickChangeSec={this.clickNewSec}
          />
          <Footer
            itemsLeft={todoCount}
            filter={filter}
            footerFilterButtons={this.footerFilterButtons}
            deleleCompletedTasks={this.deleleCompletedTasks}
          />
        </section>
      </section>
    );
  }
}
