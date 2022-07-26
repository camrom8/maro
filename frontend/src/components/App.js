import React, { Component} from "react";

import Dashboard from "./dashboard/Dashboard"
import {theme} from "./dashboard/themes/theme1";
import {renderRoot} from "./utils";

const mdTheme = theme;
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Dashboard title={this.props.title}><h1>hello world</h1></Dashboard>
    )}
}

renderRoot(App, "app");