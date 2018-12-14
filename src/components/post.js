import React, { Component } from "react";
import "../post.css";

class Post extends Component {
  constructor(props) {
    super();
    this.state = {
      likes: props.post.initialLikes
    };
    this.doLike = this.doLike.bind(this);
  }

  doLike() {
    this.setState({ likes: this.state.likes + 1 }, () => {
      console.log("doLike state", this.state);
      this.saveLikesInStoring();
    });
  }

  saveLikesInStoring() {
    const posts = JSON.parse(localStorage.getItem("savedPosts"));
    //=== string  int  == não compara
    const updatePosts = posts.map(savedPosts => {
      if (savedPosts.time === this.props.post.time) {
        savedPosts.initialLikes = this.state.likes;
      }
      return savedPosts;
    });
    localStorage.setItem("savedPosts", JSON.stringify(updatePosts));
    console.table(updatePosts);
  }
  // {this.props.authors.map(autor => {
  //         if (autor.value === this.post.author) return autor;
  //      })}

  render() {
    const post = this.props.post;
    return (
      <div className={"post"}>
        <h3 onClick={this.props.onNavigate}>{post.content}</h3>
        <h5>{post.author}</h5>
        <small>{post.time}</small>
        <div style={likeLine}>
          <p>Likes: {this.state.likes}</p>
          <button
            onClick={this.doLike}
            style={{
              backgroundColor: "blue",
              color: "white",
              fontSize: 16,
              fontWeight: "bolder",
              border: "none",
              borderRadius: 10,
              padding: 5
            }}
          >
            Like
          </button>
        </div>
      </div>
    );
  }
}
export default Post;
const likeLine = {
  display: "flex",
  justifyContent: "space-around",
  height: 40
};
