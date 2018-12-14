import React, { Component } from "react";

class PostCreator extends Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
  }

  createPost(author, id) {
    const newPost = {
      id: new Date().getMilliseconds() + new Date().getSeconds(),
      content: this.state.text,
      author: author,
      initialLikes: 0,
      time:
        new Date().getDay() +
        " de " +
        new Date().getMonth() +
        " " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds()
    };
    this.props.onCreate(newPost);
  }

  insertPost(post) {
    const myPosts = this.state.posts;
    myPosts.push(post);
    this.setState({ posts: myPosts });
  }

  aviso(author) {
    console.log("aviso");
    if (author == "all") {
      return (
        <div style={{ color: "red", fontSize: 16 }}>
          Aviso Selecione um Usuário para criar o Post!
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <h3>Novo Post</h3>
        <input
          onChange={event => {
            const value = event.target.value;
            this.setState({ text: value });
          }}
          value={this.state.text}
          style={{ width: "100%" }}
        />
        {this.aviso(this.props.authorAtual)}
        <button onClick={() => this.createPost(this.props.authorAtual)}>
          Postar
        </button>
      </div>
    );
  }
}
//Como eu consigo chamar a função aqui dentro do render;{() => this.aviso()}
export default PostCreator;
