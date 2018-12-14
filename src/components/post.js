import React, { Component } from "react";
import "../post.css";

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

  image(post) {
    const user = usuarios.filter(usuario => {
      return usuario.value == post.author;
    })[0];
    return user.image;
  }

  render() {
    const post = this.props.post;
    return (
      <div className={"post"}>
        <h3 onClick={this.props.onNavigate}>{post.content}</h3>

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
        <div style={{ padding: 5 }}>
          <h5>{post.author} </h5>
          <img style={{ width: 50, height: 50 }} src={this.image(post)} />
          <h5>postado em: {post.time}</h5>
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
