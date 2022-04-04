import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Header from "./components/Header";
import Fileinput from "./components/Fileinput";

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Fileinput />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
