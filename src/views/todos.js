import React from "react";
import { connect } from "react-redux";
import { addTodo } from "src/actions";

const AddTodo = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getInitialState() {
    return {value: ''};
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  onSubmit() {
    this.props.onSubmit(this.state.value);
    this.setState(this.getInitialState());
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <button onClick={this.onSubmit}>Add todo</button>
      </div>
    )
  }
}

const TodoList = function(props) {
  return (
    <ul>
    {props.todos.map((todo, i) =>
      <li key={i}>
        {todo}
      </li>
    )}
    </ul>
  );
}

const Todos = function(props) {
  return (
    <div>
      Todos
      <TodoList todos={props.todos} />

      <AddTodo onSubmit={(todo) => props.dispatch(addTodo(todo))} />
    </div>
  );
}

export default connect(
  (state) => {
    return {
      todos: state.todos
    }
  }
)(Todos);
