import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = { pages: [] };

  fetchPages = () => {
    fetch("/api/pages")
      .then(res => res.json())
      .then(pages => this.setState({ pages }));
  };

  render() {
    console.log(this.state.pages);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <button onClick={this.fetchPages}>Get Pages</button>
          {this.state.pages.map(page => (
            <p>{page}</p>
          ))}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
