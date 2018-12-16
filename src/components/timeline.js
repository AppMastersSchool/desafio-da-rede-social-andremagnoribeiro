import React, { Component } from "react";
import Post from "./post";
import PostCreator from "./postCreator";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      loading: false,
      authorAtual: 3
    };
  }

  componentDidMount() {
    console.log("App did mount");
    // this.readFromStorage();
    this.readFromAPI();
  }

  insertPost(post) {
    const myPosts = this.state.posts;
    myPosts.unshift(post);
    this.setState({ posts: myPosts });
    this.saveInStorage();
  }

  saveInAPI(post) {
    this.setState({ loading: true });
    axios.post("http://localhost:3001/posts", post).then(response => {
      const myPosts = this.state.posts;
      myPosts.unshift(response.data);
      this.setState({ posts: myPosts, loading: false });
    });
  }

  readFromStorage() {
    const savedPosts = localStorage.getItem("savedPosts");
    if (savedPosts) {
      this.setState({ posts: JSON.parse(savedPosts) });
    }
  }

  readFromAPI() {
    axios.get("http://localhost:3001/posts").then(response => {
      this.setState({ posts: response.data });
    });
  }

  saveInStorage() {
    const posts = JSON.stringify(this.state.posts);
    localStorage.setItem("savedPosts", posts);
  }

  onNavigate(post) {
    this.props.history.push("/post/" + post.id);
  }

  render() {
    console.log(this.props);
    return (
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "blue" }}>Minha rede social</h1>

        {this.state.posts.length > 0 ? (
          this.state.posts.map((post, i) => {
            return (
              <Post
                onNavigate={() => this.onNavigate(post)}
                key={post.time}
                post={post}
              />
            );
          })
        ) : (
          <CircularProgress />
        )}

        <AppBar
          style={{ alignItems: "center", justifyContent: "space-between" }}
          position="fixed"
          color="primary"
        >
          <Fab
            onClick={() => this.props.history.push("/criar")}
            style={{
              position: "absolute",
              zIndex: 1,
              top: 700,
              left: 900,
              right: 0,
              margin: " auto"
            }}
            color="secondary"
            aria-label="Add"
          >
            <AddIcon />
          </Fab>
        </AppBar>
      </div>
    );
  }
}

export default Timeline;
/*
        <PostCreator
          isLoading={this.state.loading}
          onCreate={this.saveInAPI.bind(this)}
          authorAtual={this.state.authorAtual}
        />*/
