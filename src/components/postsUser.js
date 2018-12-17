import React, { Component } from "react";
import Post from "./post";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

class PostsUser extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    // const posts = JSON.parse(localStorage.getItem('savedPosts'));
    // const post = posts.filter(savedPost => {
    //     return savedPost.time == this.props.match.params.time;
    // }).pop();
    // this.setState({post});
    const user = this.props.match.params.user;
    axios
      .get("http://localhost:3001/posts")
      .then(response => {
        this.setState({
          posts: response.data.filter(post => {
            return post.author == user;
          })
        });
      })
      .catch(error => {
        this.setState({ loading: false, errorMessage: "Confira sua internet" });
      });
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div>
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
      </div>
    );
  }
}
export default PostsUser;
