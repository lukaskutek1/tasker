import React from "react";

import "./index.scss";

import Form from "./components/form.js";
import Task from "./components/task.js";

import {
  Button,
  Option,
  Select,
  Input,
  Divider,
  TextArea
} from "semantic-ui-react";

export default class App extends React.Component {
  state = {
    tasks: []
  };

  onCreateTask = task => {
    console.info(task);

    this.setState(state => {
      state.tasks.push(task);

      return state;
    });
  };

  saveTask = (index, task) => {
    this.setState(state => {
      state.tasks[index] = task;

      return state;
    });
  };

  changeTaskName = (index, name) => {
    this.setState(state => {
      state.tasks[index].task = name;

      return state;
    });
  };
  changeTaskAuthor = (index, name) => {
    this.setState(state => {
      state.tasks[index].author = name;

      return state;
    });
  };

  changeTaskOption = (index, name) => {
    this.setState(state => {
      state.tasks[index].option = name;

      return state;
    });
  };

  changeTaskDate = (index, name) => {
    this.setState(state => {
      state.tasks[index].date = name;
      return state;
    });
  };

  onDelete = index => {
    this.setState(state => {
      state.tasks.splice(index, 1);

      return state;
    });
  };

  render() {
    const { tasks } = this.state;

    const data = {
      a1: {
        name: "Michal",
        task: "Nakup"
      },
      a2: {
        name: "Michal",
        task: "Nakup"
      }
    };

    console.info(Object.keys(data)); // ["a1", "a2"]
    console.info(Object.values(data));
    /*
    [{
      name: "Michal",
      task: "Nakup"
    }, {
      name: "Michal",
      task: "Nakup"
    }]
    */
    console.info(Object.entries(data));
    /*
    [
      [
        'a1',
        {
          name: "Michal",
          task: "Nakup"
        }
      ],
      [
        'a2',
        {
          name: "Michal",
          task: "Nakup"
        }
      ]
    ]
    */
    Object.keys(data).map(taskId => {
      const task = data[taskId];
      console.info(taskId, task);
    });

    Object.entries(data).map(([taskId, task]) => {
      console.info(taskId, task);
    });

    Object.keys(data)
      .map(taskId => data[taskId])
      .map(task => {
        console.info(task);
      });

    return (
      <div className="container">
        <div>
          <h1>Tasker</h1>
          {tasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              index={index}
              saveTask={this.saveTask}
              changeTaskName={this.changeTaskName}
              changeTaskAuthor={this.changeTaskAuthor}
              changeTaskOption={this.changeTaskOption}
              changeTaskDate={this.changeTaskDate}
              onDelete={this.onDelete}
            />
          ))}
        </div>
        <Divider />
        <Form onCreateTask={this.onCreateTask} />
        <br />
        <pre className="state">{/*JSON.stringify(tasks, undefined, 2)*/}</pre>
      </div>
    );
  }
}
