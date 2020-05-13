import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { initialState, Reducer } from "./redux/reducer";
import Main from "./components/MainComponent";
import "./App.css";

const store = createStore(Reducer, initialState);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
