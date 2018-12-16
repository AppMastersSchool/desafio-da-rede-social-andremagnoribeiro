import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Select from "react-select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import ReactDOM from "react-dom";
import NativeSelect from "@material-ui/core/NativeSelect";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";

class PostCreator extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      image: "",
      users: [],
      idUserAtual: -1,
      loading: false
    };
  }
  componentDidMount() {
    this.readUsers();
  }
  createPost() {
    this.setState({ loading: true });
    axios
      .get("http://localhost:3001/author/" + this.state.idUserAtual)
      .then(response => {
        console.log("000000000000999", response.data.image);
        const newPost = {
          content: this.state.text,
          author: this.state.idUserAtual,
          imageAuthor: response.data.image,
          image: this.state.image,
          data: new Date().getTime(),
          initialLikes: 0
        };
        this.savePost(newPost);
      });
  }
  savePost(post) {
    axios.post("http://localhost:3001/posts", post).then(response => {
      this.setState({ loading: false });
    });
  }

  readUsers() {
    axios.get("http://localhost:3001/author").then(response => {
      this.setState({ users: response.data });
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log("asdfasdfasdf4444", this.state.idUserAtual);
  };

  getUser(id) {
    if (id != -1) {
      const user = this.state.users.filter(user => {
        return user.id == this.state.idUserAtual;
      })[0];
      return " " + user.image;
    } else {
      return false;
    }
  }
  render() {
    console.table(this.state.users);
    return (
      <div style={{ padding: 15 }}>
        <div style={{ padding: 15, textAlign: "center" }}>
          <h1 style={{ display: "flex" }}>
            Crie seu Post Usuario:
            {this.getUser(this.state.idUserAtual) ? (
              <Avatar
                aria-label="Recipe"
                src={this.getUser(this.state.idUserAtual)}
              />
            ) : (
              <a> Escolha usuario</a>
            )}
          </h1>
        </div>
        <FormControl style={{ width: "100%" }}>
          <NativeSelect
            value={this.state.idUserAtual}
            onChange={this.handleChange("idUserAtual")}
            inputProps={{
              name: "age",
              id: "age-native-simple"
            }}
          >
            <option style={{ color: "#b1b4bc" }} value={""}>
              Selecione um Usuário
            </option>

            {this.state.users.map((user, i) => {
              return <option value={user.id}>{user.name}</option>;
            })}
          </NativeSelect>
        </FormControl>
        <h3>Titulo do Post</h3>
        <TextField
          defaultValue="Default Value"
          multiline
          id="filled-multiline-static"
          label="Titulo"
          rows="4"
          onChange={event => {
            const value = event.target.value;
            this.setState({ text: value });
          }}
          value={this.state.text}
          style={{ width: "100%" }}
        />
        <h3>Imagens do Post(URL)</h3>
        <TextField
          id="standard-name"
          label="Imagem(URL)"
          value={this.state.image}
          onChange={this.handleChange("name")}
          margin="normal"
          onChange={event => {
            const value = event.target.value;
            this.setState({ image: value });
          }}
          value={this.state.image}
          style={{ width: "100%" }}
        />
        {this.state.image != "" ? (
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            image={this.state.image}
            title="Paella dish"
          />
        ) : (
          <h3>Coloque uma URL</h3>
        )}

        {this.state.loading ? (
          <CircularProgress />
        ) : (
          <Button
            style={{ margin: 20 }}
            onClick={() => this.createPost()}
            variant="contained"
            color="primary"
          >
            save
            {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
            <SaveIcon />
          </Button>
        )}
      </div>
    );
  }
}

export default PostCreator;
