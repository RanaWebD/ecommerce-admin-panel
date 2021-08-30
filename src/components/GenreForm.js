import React, { Component } from "react";
import { findDOMNode } from "react-dom";

class GenreForm extends Component {
  handleSubmit = (event, genreForm, selectedGenre) => {
    event.preventDefault();
    let titleValue = findDOMNode(this.refs.title).value;
    let descriptionValue = findDOMNode(this.refs.description).value;

    let data = {};
    if (titleValue !== "") {
      data.title = titleValue;
    }
    if (descriptionValue !== "") {
      data.description = descriptionValue;
    }
    switch (genreForm) {
      case "editGenreForm":
        return this.props.editGenre(
          this.props.currentUser.user.id,
          data,
          selectedGenre._id
        );
      case "postGenreForm":
        return this.props.postGenre(this.props.currentUser.user.id, data);
      default:
        return null;
    }
  };

  form = (genreForm, selectedGenre) => {
    console.log(selectedGenre);
    return (
      <div className="row">
        {genreForm === "editGenreForm" ? (
          <div>
            <div>old genre : {selectedGenre.title}</div>
          </div>
        ) : null}
        <div className="col-sm-12 col-md-6">
          <form
            onSubmit={event =>
              this.handleSubmit(event, genreForm, selectedGenre)
            }
          >
            <input
              type="text"
              placeholder="Enter Title"
              ref="title"
              name="title"
            />
            <input
              type="text"
              placeholder="Enter Description"
              ref="description"
              name="description"
            />
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  };

  render() {
    const { genreForm, selectedGenre } = this.props;
    switch (genreForm) {
      case "postGenreForm":
        return this.form(genreForm, selectedGenre);

      case "editGenreForm":
        return <div>{this.form(genreForm, selectedGenre)}</div>;
      default:
        return null;
    }
  }
}

export default GenreForm;
