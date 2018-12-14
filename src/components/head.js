import React, { Component } from "react";

class Head extends Component {
  render() {
    return (
      <div>
        <h1>Minha rede social</h1>
        <button onClick={() => this.props.props.history.push("/")}>
          Inicial
        </button>
        <button onClick={() => this.props.props.history.push("/sobre")}>
          Ver Sobre
        </button>
        <div />
      </div>
    );
  }
}
export default Head;
