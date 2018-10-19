import React from "react";

import { OPTIONS, DATES } from "../constants/const.js";

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

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      cancelTask: { ...props.task }
    };
  }

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
    this.props.changeTaskAuthor(this.props.index, this.state.cancelTask.author);
    this.props.changeTaskName(this.props.index, this.state.cancelTask.task);
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
