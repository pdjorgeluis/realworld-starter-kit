import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import articleReducer from "./Reducers/articleReducer";
// import './index.css';

const store = configureStore({
  reducer: {
    articles: articleReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

