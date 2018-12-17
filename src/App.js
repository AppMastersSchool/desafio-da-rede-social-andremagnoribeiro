import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Timeline from "./components/timeline";
import PostDetails from "./components/postDetails";
import PostCreator from "./components/postCreator";
import Header from "./components/header";
import PostsUser from "./components/postsUser";

class App extends Component {
  showNotFound() {
    return <div>Página não encontrada :(</div>;
  }

  aboutPage() {
    const page = (
      <div>
        <h1>Sobre esse sistema</h1>
        <h3>Sou feito em REACT!</h3>
      </div>
    );
    return page;
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/post/:id" component={PostDetails} />
            <Route path="/posts/:user" component={PostsUser} />
            <Route path="/sobre" component={this.aboutPage} />
            <Route path="/criar/:idUser" component={PostCreator} />
            <Route exact path="/" component={Header} />
            <Route exact path="/time" component={Timeline} />
            <Route path="*" component={this.showNotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
/*
 */
export default App;
