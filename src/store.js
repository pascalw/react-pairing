import { createStore } from "redux";

function state(state = {}, action) {
  switch(action) {
    default:
      return state
  }
}

export default createStore(
  state,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
