import * as React from "react";
import { render } from "react-dom";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
