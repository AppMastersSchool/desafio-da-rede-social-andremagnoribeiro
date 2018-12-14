import React, { Component } from "react";
import Head from "./head";
class About extends Component {
  render() {
    console.log("----------------------999asdasd" + this.props);
    return (
      <div>
        <Head props={this.props} />
        <h2>Sobre o projeto</h2>
      </div>
    );
  }
}
export default About;
