import React, { Component } from "react";

import Post from "./post.js";
import PostCreator from "./postCreator.js";
import Head from "./head";
import Select from "react-select";

const postArray = [
  {
    id: 1,
    content: "Primeiro Post",
    time: "16:87",
    author: "andre",
    initialLikes: 0
  },
  {
    id: 2,
    content: "Segundo Post",
    time: "12:55",
    author: "lucas",
    initialLikes: 1
  }
];

const options = [
  { value: "andre", label: "André " },
  { value: "lucas", label: "Lucas" },
  { value: "pedro ", label: "Pedro" }
];
class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      posts: postArray,
      authorAtual: "andre"
    };
  }

  componentDidMount() {
    const posts = JSON.stringify(this.state.posts);
    localStorage.setItem("savedPosts", posts);
    console.log("app did mouth");
    this.readFromStorange();
  }

  insertPost(post) {
    const myPosts = JSON.parse(localStorage.getItem("savedPosts"));
    //myPosts.push(post);
    myPosts.unshift(post);
    localStorage.setItem("savedPosts", JSON.stringify(myPosts));
    this.readFromStorange();
    //this.saveInStorange();
    /////////////////
    const posts = JSON.parse(localStorage.getItem("savedPosts"));
    console.table(posts);
    /////////////
  }

  saveInStorange() {
    const posts = JSON.stringify(this.state.posts);
    localStorage.setItem("savedPosts", posts);
  }

  readFromStorange() {
    //const savedPosts = localStorage.getItem("savedPosts");
    //if (savedPosts) {
    //  this.setState({ posts: JSON.parse(savedPosts) });
    //}
    const posts = JSON.parse(localStorage.getItem("savedPosts"));
    const post = posts.filter(savedPost => {
      return savedPost.author == this.state.authorAtual;
    });
    this.setState({ posts: post });
  }
  filtraPosts(author) {
    console.log(author);
  }

  onNavigate(post) {
    this.props.history.push("/post/" + post.time);
  }

  handleChange(selectedOption) {
    this.readFromStorange();
    console.log(">>>>>", this.state.authorAtual);
  }
  render() {
    return (
      <div>
        <Head props={this.props} />
        <h2>Selecione o Usuario:</h2>
        <Select
          value={this.authorAtual}
          onChange={event => {
            const value = event.value;
            this.setState({ authorAtual: value }, () => {
              console.log("doLike state", this.state);
              this.handleChange();
            });
          }}
          options={options}
        />

        <PostCreator
          authorAtual={this.state.authorAtual}
          onCreate={this.insertPost.bind(this)}
        />

        {this.state.posts.map((post, i) => {
          return (
            <Post
              //authors={this.options}
              onNavigate={() => this.onNavigate(post)}
              key={post.time}
              post={post}
            />
          );
        })}
      </div>
    );
  }
}

export default Timeline;

//<Post time={"13:00"}>Texto Primeiro post</Post>
//<Post time={"14:00"}>Texto segundo post</Post>
//<Post time={"15:00"}>"Texto terceiro post"</Post>
//<Post time={"16:00"}>Texto quarto post</Post>
