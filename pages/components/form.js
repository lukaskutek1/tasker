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

export default class Form extends React.Component {
  state = {
    task: "",
    author: "",
    form: false
  };

  handleChangeOption = e => {
    this.setState({
      option: e.target.value
    });
  };
  handleChangeOption2 = e => {
    this.setState({
      date: e.target.value
    });
  };

  onChangeTask = e => {
    const { value } = e.target;

    this.setState({
      task: value
    });
  };

  onChangeAuthor = e => {
    const { value } = e.target;

    this.setState({
      author: value
    });
  };

  pridatTask = () => {
    const { task, author, option, date } = this.state;
    this.setState({
      task: "",
      author: "",
      form: !this.state.form
    });
    this.props.onCreateTask({ task, author, option, date });
  };

  otevriTask = () => {
    this.setState({
      form: !this.state.form
    });
  };

  render() {
    const { task, author } = this.state;
    return (
      <div>
        {this.state.form ? (
          <div>
            <select
              className="dropdown ui"
              onChange={this.handleChangeOption}
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
              onChange={this.handleChangeOption2}
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
            <Input type="text" value={author} onChange={this.onChangeAuthor} />
            <br />
            <Input type="text" value={task} onChange={this.onChangeTask} />
            <br />
            <Button onClick={this.pridatTask}>Pridat Task</Button>
          </div>
        ) : (
          <Button onClick={this.otevriTask}>Pridat Task</Button>
        )}
      </div>
    );
  }
}
