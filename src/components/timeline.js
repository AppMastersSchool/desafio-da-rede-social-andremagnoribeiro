import React, { Component } from "react";

import Post from "./post.js";
import PostCreator from "./postCreator.js";
import Head from "./head";
import Select from "react-select";

const postArray = [
  {
    id: 4323,
    content: "Primeiro Post",
    time: "16:87",
    author: "Andre",
    initialLikes: 0
  },
  {
    id: 4454,
    content: "Segundo Post",
    time: "12:55",
    author: "Stela",
    initialLikes: 1
  }
];

const usuarios = [
  {
    value: "all",
    label: "Motrar Todos",
    image: ""
  },
  {
    value: "Andre",
    label: "André ",
    image:
      "http://s2.glbimg.com/jsaPuF7nO23vRxQkuJ_V3WgouKA=/e.glbimg.com/og/ed/f/original/2014/06/10/461777879.jpg"
  },
  {
    value: "Stela",
    label: "Stela",
    image:
      "https://osegredo.com.br/wp-content/uploads/2017/09/O-que-as-pessoas-felizes-t%C3%AAm-em-comum-site-830x450.jpg"
  },
  {
    value: "Pedro",
    label: "Pedro",
    image: "https://hypescience.com/wp-content/uploads/2013/12/sucesso.jpg"
  }
];
////////////////////////////////////////////////////////////////////////
class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      posts: postArray,
      authorAtual: "all"
    };
  }

  componentDidMount() {
    console.log("app did mouth");
    this.readFromStorange();
  }

  insertPost(post) {
    if (this.state.authorAtual == "all") {
    } else {
      const myPosts = JSON.parse(localStorage.getItem("savedPosts"));
      myPosts.unshift(post);
      localStorage.setItem("savedPosts", JSON.stringify(myPosts));
      this.readFromStorange();
    }
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
    const posts = JSON.parse(localStorage.getItem("savedPosts"));
    console.log("Filtrar Pelo Usuario:", this.state.authorAtual);
    if (this.state.authorAtual == "all") {
      this.setState({ posts: posts });
    } else {
      const post = posts.filter(savedPost => {
        return savedPost.author == this.state.authorAtual;
      });
      this.setState({ posts: post });
    }
  }
  filtraPosts(author) {
    console.log(author);
  }

  onNavigate(post) {
    this.props.history.push("/post/" + post.time);
  }

  handleChange(selectedOption) {
    this.readFromStorange();
    console.log("authorAtual:", this.state.authorAtual);
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
          options={usuarios}
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
              key={post.id}
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
