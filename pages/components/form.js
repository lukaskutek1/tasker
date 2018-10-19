import React from "react";

import {
  Button,
  Option,
  Select,
  Input,
  Divider,
  TextArea
} from "semantic-ui-react";

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
