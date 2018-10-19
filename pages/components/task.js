import React from "react";

import {
  Button,
  Option,
  Select,
  Input,
  Divider,
  TextArea
} from "semantic-ui-react";

import "../index.scss";

/*
KNOWN ISSUES(1)
NEFUNKCI CANCEL TASK <= input rovnou mění state - potřeba změnit!!!!
*/
const OPTIONS = {
  a: {
    name: "Home",
    color: "red",
    icon: "fas fa-home fa-3x",
    iconStyle: "iconA"
  },
  b: {
    name: "Work",
    color: "blue",
    icon: "fas fa-briefcase fa-3x",
    iconStyle: "iconB"
  },
  c: {
    name: "SCIAL",
    color: "green",
    icon: "fas fa-user fa-3x",
    iconStyle: "iconC"
  }
};

const DATES = {
  a: {
    name: "Today",
    description: "",
    color: "green"
  },
  b: {
    name: "Tomorrow",
    description: "",
    color: "red"
  },
  c: {
    name: "Future",
    description: "",
    color: "blue"
  }
};

export default class Task extends React.Component {
  state = {
    isEditable: false
  };

  changeTask = e => {
    const { index } = this.props;

    this.props.changeTaskName(index, e.target.value);
  };
  changeAuthor = e => {
    const { index } = this.props;

    this.props.changeTaskAuthor(index, e.target.value);
  };
  changeOption = e => {
    const { index } = this.props;
    this.props.changeTaskOption(index, e.target.value);
  };
  changeDate = e => {
    const { index } = this.props;
    this.props.changeTaskDate(index, e.target.value);
  };

  saveTask = () => {
    this.setState({
      isEditable: false
    });
  };

  toggleEditable = () => {
    this.setState({
      isEditable: true
    });
  };

  cancelTask = () => {
    this.setState({
      isEditable: !this.state.isEditable
    });
  };

  onDelete = () => {
    const { index } = this.props;

    this.props.onDelete(index);
  };

  render() {
    const { isEditable } = this.state;
    const { task, author, option, date } = this.props;
    console.log("option: ", option);
    return isEditable ? (
      <div>
        <Divider />
        <select
          className="dropdown ui"
          onChange={this.changeOption}
          value={this.state.option}
        >
          <option>Vyber</option>
          {Object.entries(OPTIONS).map(([id, item]) => (
            <option key={id} value={id}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          className="dropdown ui"
          onChange={this.changeDate}
          value={this.state.date}
        >
          <option>Vyber</option>
          {Object.entries(DATES).map(([id, item]) => (
            <option key={id} value={id}>
              {item.name}
            </option>
          ))}
        </select>
        <br />
        <Input type="text" value={task.author} onChange={this.changeAuthor} />
        <br />
        <Input type="text" value={task.task} onChange={this.changeTask} />
        <br />
        <Button onClick={this.saveTask}>ulozit</Button>
        <Button onClick={this.cancelTask}>zrusit</Button>
        <Divider />
      </div>
    ) : (
      <div>
        <div className="singleTask">
          <div className="iconBg">
            <div className={OPTIONS[task.option].iconStyle}>
              <i className={OPTIONS[task.option].icon} />
            </div>
          </div>
          <div className="taskNadpis">
            <b>{task.author}</b>
            <div className="taskText">{task.task}</div>
          </div>
          <div className="taskOptionst">
            <div className="delete" onClick={this.onDelete}>
              <i className="fas fa-trash-alt" />
            </div>
            <div className="edit" onClick={this.toggleEditable}>
              <i className="fas fa-cog" />
            </div>
            <div className="date">
              <b>{DATES[task.date].name}</b>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
