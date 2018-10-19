//core
import React from "react";
//css && semantic-ui
import "./index.scss";
//others
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
// << tohle se pouziva hodne a tyhle staticke hodnoty mohou byt mimo state protoze je nepotrebujes nijak nastavovat
// proto jsem to definoval pred tou tridou
// to ze to je znormalizovane podle tech idcek hodne pomaha pak pri praci s tim
// tak jo musim pracovat tak se mej krasne :) pokracovani priste. ok díky

class App extends React.Component {
  state = {
    value: "",
    value2: "",

    nadpis: "",
    text: "",

    taskNadpis: "",
    taskText: "",

    option: "",
    date: "",

    task: [],
    tasks: [],

    form: true
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

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleChange2 = event => {
    this.setState({ value2: event.target.value });
  };

  nadpisHandler = event => {
    this.setState({ nadpis: event.target.value });
  };

  textHandler = event => {
    this.setState({ text: event.target.value });
  };

  saveTask = e => {
    e.preventDefault();
    this.setState({
      taskNadpis: this.state.nadpis,
      taskText: this.state.text,
      task: [this.state.nadpis, this.state.text]
    }); // do statu ukladam {nadpis: neco, text: neco} a cely tohle vzdy teprve pridam do pole, tim mi vznika jakoby pole tasku
    const { nadpis, text, option, date } = this.state;
    if (nadpis !== "" && text !== "") {
      this.setState(state => {
        // sry musel jsem neco resit
        const newTasks = [
          ...state.tasks, // jinak tohle vytvori nove pole ... proda to donej vsechny tasky ktere uz mas a nakonec da novou hodnotu
          {
            nadpis: state.nadpis,
            text: state.text,
            nejakaDalsiHodnota: state.value, // - sem muzes pridat cokoliv a pak to dole muzes vypsat,
            option: state.option, // sem ulozim jen id
            date: state.date
          }
        ];
        // c podstat se podivas na to co mas ulozene ve statu a pridas si to do toho noveho tasku
        const { date, option } = this.state;

        if (date != 0 && option != 0) {
          return {
            tasks: newTasks,
            nadpis: "",
            text: "",
            option: 0,
            date: 0,
            form: !this.state.form
          };
        } else {
          alert("Vyber oba selecty");
        }
      });
    } else {
      alert("Vypln oba input boxy");
    }
  };

  /*
  renderTask = () => {
    const { taskText, taskNadpis } = this.state;
    return (
      <div>
        <p>
          {taskNadpis} > {taskText}
        </p>
      </div>
    );
  };
  */

  edit = index => {
    this.setState({
      form: !this.state.form,
      nadpis: tasks[index].nadpis,
      text: tasks[index].text,
      option: tasks[index].option,
      date: tasks[index].date
    });
  };

  remove = index => {
    //newTasks.pop()
    tasks.splice(index, 1);
  };

  add = () => {
    console.log("add");
    this.setState({
      form: !this.state.form
    });
  };

  render() {
    const { options, value, value2, dates, tasks } = this.state;
    return (
      <div className="container">
        <h1>Tasker</h1>
        {tasks.map(task => {
          return (
            <div className="singleTask">
              <div className="iconBg">
                <div className={OPTIONS[task.option].iconStyle}>
                  <i className={OPTIONS[task.option].icon} />
                </div>
              </div>
              <div className="taskNadpis">
                <b>{task.nadpis}</b>
                <div className="taskText">{task.text}</div>
              </div>
              <div className="taskOptionst">
                <div className="delete" onClick={() => tasks.pop()}>
                  <i className="fas fa-trash-alt" />
                </div>
                <div className="edit" onClick={this.edit}>
                  <i className="fas fa-cog" />
                </div>
                <div className="date">{DATES[task.date].name}</div>
              </div>
            </div>
          );
        })}
        {/*this.renderTask()*/}
        <Divider />
        <div>
          {this.state.form ? (
            <Button onClick={this.add}>Add</Button>
          ) : (
            <div className="form">
              <form onSubmit={this.saveTask}>
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
                <Input
                  placeholder="Headline"
                  type="text"
                  onChange={this.nadpisHandler}
                  value={this.state.nadpis}
                />
                <br />
                <Input
                  placeholder="Additional info"
                  className="text"
                  onChange={this.textHandler}
                  value={this.state.text}
                />
                <br />

                <Button onClick={this.saveTask}>Add to task</Button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default App;
