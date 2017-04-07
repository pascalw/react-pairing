import { createStore } from "redux";
import {ADD_TODO} from "src/actions";

const initialState = {
  todos: []
};

function state(state, action) {
  switch(action.type) {
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [...state.todos, action.text]
      });
    default:
      return state
  }
}

export default createStore(
  state,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
