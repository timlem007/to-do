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
  };

  deleteTast = (id) => {
    this.setState(({ taskLists }) => {
      const idx = taskLists.findIndex((el) => el.id === id);

      const newArray = [...taskLists.slice(0, idx), ...taskLists.slice(idx + 1)];

      return {
        taskLists: newArray,
      };
    });
  };

  onSubmitChangeTask = (text, min, sec) => {
    this.setState(({ taskLists }) => {
      const newTask = this.createTask(text, min, sec);
      const newArray = [...taskLists, newTask];

      return {
        taskLists: newArray,
      };
    });
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

  submitChangeTask = (id, text, min, sec) => {
    this.setState(({ taskLists }) => {
      const idx = taskLists.findIndex((el) => el.id === id);
      const clone = [...taskLists.slice()];

      clone[idx].hiddenInputName = false;
      clone[idx].todo = text;
      clone[idx].min = min;
      clone[idx].sec = sec;

      return {
        taskLists: clone,
      };
    });
  };

  // const changeTask = (id, text, min, sec) => {
  //   setTaskList(
  //     taskList.map((taskss) => {
  //       const task = taskss;
  //       if (task.id === id) {
  //         task.text = text;
  //         task.min = min;
  //         task.sec = sec;
  //         task.hiddenInput = true;
  //       }
  //       return task;
  //     }),
  //   );
  // };

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
    event.preventDefault();
    event.stopPropagation();
    const { taskLists } = this.state;
    taskLists.forEach((tasks) => {
      if (tasks.id === id && !tasks.timerOn) {
        const play = setInterval(() => this.setState(() => {
          const idx = taskLists.findIndex((el) => el.id === id);
          const newArray = [...taskLists];

          let time = newArray[idx].sec + (newArray[idx].min * 60);
          if (time === 0) {
            clearInterval(play);
            newArray[idx].timerOn = false;
          } else {
            newArray[idx].timerOn = true;
            time -= 1;
            newArray[idx].min = Math.floor(time / 60);
            newArray[idx].sec = time % 60;
            newArray[idx].funcInterval = play;
          }

          return {
            taskLists: newArray,
          };
        }), 1000);
      }
      return tasks;
    });
  };

  timerStop = (id, event) => {
    event.preventDefault();
    event.stopPropagation();
    const { taskLists } = this.state;
    taskLists.forEach((tasks) => {
      if (tasks.id === id && tasks.timerOn) {
        this.setState(() => {
          const idx = taskLists.findIndex((el) => el.id === id);
          const newArray = [...taskLists];
          clearInterval(newArray[idx].funcInterval);
          newArray[idx].timerOn = false;
          return {
            taskLists: newArray,
          };
        });
      }
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
      sessionTime,
      timerOn,
    } = this.state;
    const todoCount = taskLists.filter((el) => !el.active);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskFrom
            onSubmitChangeTask={this.onSubmitChangeTask}
          />
        </header>
        <section className="main">
          <TaskList
            data={taskLists}
            onDeleted={this.deleteTast}
            onTaskClick={this.onTaskClick}
            submitChangeTask={this.submitChangeTask}
            clickNewTask={this.clickNewTask}
            clickChangeTaskName={this.clickChangeTaskName}
            filter={filter}
            timerPlay={this.timerPlay}
            sessionTime={sessionTime}
            timerOn={timerOn}
            timerStop={this.timerStop}
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
