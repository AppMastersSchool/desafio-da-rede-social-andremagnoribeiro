import React, { Component } from "react";
import Timeline from "./components/timeline";
import About from "./components/about";
//{Router } ou Post defaut Post
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PostDetails from "./components/postDetails";

class App extends Component {
  showNotFound() {
    return <div>Pagina não encontrada :(</div>;
  }

  aboutPage() {
    return <div>Sobre</div>;
  }

  render() {
    console.log("asda888888888888sd" + this.props);
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/post/:time" component={PostDetails} />
            <Route path="/sobre" component={About} />
            <Route exact path="/" component={Timeline} />
            <Route path="*" component={this.showNotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
