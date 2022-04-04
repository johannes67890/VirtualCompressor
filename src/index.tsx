import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Header from "./components/Header";
import Fileinput from "./components/Fileinput";

ReactDOM.render(
  <React.StrictMode>
    <div className="max-w-6xl mx-auto">
      <Header />
      <Fileinput />
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
