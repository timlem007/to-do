import React, { Component } from 'react';

import './to-do.css';

import Footer from '../footer';
import NewTaskFrom from '../new-task-form';
import TaskList from '../task-list';

export default class ToDo extends Component {
  maxId = 100;

  state = {
    taskLists: [],
    filter: {
      all: true,
      active: false,
      unactive: false,
    },
    newTaskForm: '',
    changeTaskForm: '',
  };

  // addNewTask = (text) => {
  //   this.setState(({ taskLists }) => {
  //     const newTask = this.createTask(text);
  //     const newArray = [...taskLists, newTask];

  //     return {
  //       taskLists: newArray,
  //     };
  //   });
  // };

  deleteTast = (id) => {
    this.setState(({ taskLists }) => {
      const idx = taskLists.findIndex((el) => el.id === id);

      const newArray = [...taskLists.slice(0, idx), ...taskLists.slice(idx + 1)];

      return {
        taskLists: newArray,
      };
    });
  };

  // new-task-form form
  onSubmitChangeTask = (event) => {
    event.preventDefault();
    this.setState(({ changeTaskForm, taskLists }) => {
      const newTask = this.createTask(changeTaskForm);
      const newArray = [...taskLists, newTask];

      return {
        taskLists: newArray,
        changeTaskForm: '',
      };
    });
  };

  // new-task-form onChange
  clickChangeTask = (event) => {
    this.setState(() => ({
      changeTaskForm: event.target.value,
    }));
  };

  // tesk checkboxClick
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

  // task changeButton
  clickChangeTaskName = (id) => {
    this.setState(({ taskLists }) => {
      const idx = taskLists.findIndex((el) => el.id === id);
      const newArray = [...taskLists.slice()];

      newArray[idx].hiddenInputName = !newArray[idx].hiddenInputName;

      return {
        taskLists: newArray,
        newTaskForm: newArray[idx].todo,
      };
    });
  };

  // task onChange
  clickNewTask = (event) => {
    this.setState(() => ({
      newTaskForm: event.target.value,
    }));
  };

  // task form
  onSubmitNewTask = (id, event) => {
    event.preventDefault();
    this.setState(({ taskLists, newTaskForm }) => {
      const idx = taskLists.findIndex((el) => el.id === id);
      const clone = [...taskLists.slice()];

      clone[idx].todo = newTaskForm;
      clone[idx].hiddenInputName = false;
      clone[idx].createData = new Date();

      const newArray = [...clone.slice(0, idx), clone[idx], ...clone.slice(idx + 1)];

      return {
        taskLists: newArray,
      };
    });
  };

  // footer filter buttons
  footerFilterButtons = (text) => {
    this.setState(({ filter }) => {
      const filterNewArray = filter;

      for (const key in filterNewArray) {
        if (Object.prototype.hasOwnProperty.call(filterNewArray, key)) {
          filterNewArray[key] = false;
        }
      }

      if (text === 'all') {
        filterNewArray[text] = true;
      }
      if (text === 'active') {
        filterNewArray[text] = true;
      }
      if (text === 'unactive') {
        filterNewArray[text] = true;
      }

      return {
        filter: filterNewArray,
      };
    });
  };

  // footer delele completed task
  deleleCompletedTasks = () => {
    this.setState(({ taskLists }) => {
      const newArray = taskLists.filter((el) => !el.active);

      return {
        taskLists: newArray,
      };
    });
  };

  createTask(name) {
    this.maxId += 1;
    return {
      todo: name,
      active: false,
      id: (this.maxId),
      hiddenInputName: false,
      createData: new Date(),
    };
  }

  render() {
    const { taskLists, filter, changeTaskForm } = this.state;

    const todoCount = taskLists.filter((el) => !el.active);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskFrom
            onSubmitChangeTask={this.onSubmitChangeTask}
            changeTaskForm={changeTaskForm}
            clickChangeTask={this.clickChangeTask}
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
