import React, { Component } from "react";
import Post from "./post";
class PostDetails extends Component {
  constructor() {
    super();
    this.state = {
      post: null
    };
  }

  componentDidMount() {
    const posts = JSON.parse(localStorage.getItem("savedPosts"));
    const post = posts.filter(savedPost => {
      return savedPost.time == this.props.match.params.time;
    })[0];
    this.setState({ post });
    console.log(posts);
    console.log(post);
  }
  render() {
    if (this.state.post === null) {
      return <div>loading...</div>;
    } else {
      return (
        <div>
          <Post post={this.state.post} />
        </div>
      );
    }
  }
}
export default PostDetails;
