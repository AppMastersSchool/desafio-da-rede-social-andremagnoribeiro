import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LikeIcon from "@material-ui/icons/ThumbUp";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";

import "../post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: props.post.initialLikes
    };
    this.doLike = this.doLike.bind(this);
    this.saveLikesInAPI = this.saveLikesInAPI.bind(this);
  }
  doLike() {
    this.setState({ likes: this.state.likes + 1 }, () => {
      console.log("after");
      console.log("doLike state", this.state);
      this.saveLikesInStorage();
    });
  }
  saveLikesInAPI() {
    const post = this.props.post;
    post.initialLikes = this.state.likes + 1;
    axios.put("http://localhost:3001/posts/" + post.id, post).then(response => {
      this.setState({ likes: this.state.likes + 1 });
    });
  }

  saveLikesInStorage() {
    const posts = JSON.parse(localStorage.getItem("savedPosts"));
    const updatePosts = posts.map(savedPost => {
      if (savedPost.time === this.props.post.time) {
        savedPost.initialLikes = this.state.likes;
      }
      return savedPost;
    });
    localStorage.setItem("savedPosts", JSON.stringify(updatePosts));
    console.table(updatePosts);
  }

  render() {
    const post = this.props.post;
    console.log(this.props);
    return (
      <Card style={{ margin: 40 }}>
        <CardContent>
          <CardHeader
            avatar={<Avatar aria-label="Recipe" src={post.imageAuthor} />}
            title={post.author}
            subheader={post.time}
          />
        </CardContent>
        <CardMedia
          onClick={this.props.onNavigate}
          style={{ height: 0, paddingTop: "56.25%" }}
          image={post.image}
          title="Paella dish"
        />
        <CardContent>
          <Typography component="p">{post.content}}</Typography>
        </CardContent>

        <CardActions>
          <div style={likeLine}>
            <p>Likes: {this.state.likes}</p>

            <IconButton onClick={this.saveLikesInAPI}>
              <LikeIcon fontSize="large" />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    );
  }
}

const likeLine = {
  display: "flex",
  justifyContent: "space-around",
  height: 40
};

export default Post;
