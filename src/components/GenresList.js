import React, { Component } from "react";
// COMPONENTS
import GenreForm from "./GenreForm";
import GenresListItem from "./GenresListItem";
// CSS
import "../CSS/genresList.css";

class GenresList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentComponent: "genresList",
      genreForm: "",
      selectedGenre: null
    };
  }

  editBtnCall = (currentComponent, genreForm, selectedGenre) => {
    this.setState({ currentComponent, genreForm, selectedGenre });
  };

  renderComponent = () => {
    console.log("dg", this.props)

    switch (this.state.currentComponent) {
      case "genresList":
        return (
          <GenresListItem
            currentUser={this.props.currentUser}
            genres={this.props.genres}
            editBtnCall={this.editBtnCall}
            dGenre={this.props.dGenre}
            deletegenre={this.props.deleteGenre}
          />
        );
      case "genreForms":
        return (
          <GenreForm
            currentUser={this.props.currentUser}
            genreForm={this.state.genreForm}
            selectedGenre={this.state.selectedGenre}
            editGenre={this.props.editGenre}
            postGenre={this.props.postGenre}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="row" id="genres-list-container">
        <div className="col-sm-3" id="genres-list-side-navbar-container">
          <button
            className="btn genres-list-side-nav-btn"
            onClick={() => this.setState({ currentComponent: "genresList" })}
          >
            Genres
          </button>
          <button
            className="btn genres-list-side-nav-btn"
            onClick={() =>
              this.setState({
                currentComponent: "genreForms",
                genreForm: "postGenreForm"
              })
            }
          >
            add genre
          </button>
        </div>
        <div className="col-sm-9">
          <div className="row">{this.renderComponent()}</div>
        </div>
      </div>
    );
  }
}

export default GenresList;
