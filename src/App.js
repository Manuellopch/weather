import "./App.css";
import React from "react";
import Weather from "./Weather";

function App() {
  return (
    <>
      <div>
        <header>
          <h1 className={"link"}>Weather App</h1>
        </header>
      <Weather />
      </div>
    </>
  );
}

export default App;
