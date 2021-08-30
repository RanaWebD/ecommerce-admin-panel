import React, { Component } from "react";
import { findDOMNode } from "react-dom";

class StaffPickForm extends Component {

  handleSubmit = (event, categoryForm, selectedCategory) => {
    event.preventDefault();
    const form = document.querySelector("form")
    const formData = new FormData(form)
    switch (categoryForm) {
      case "editCategoryForm":
        this.props.updateStaffPick(formData, selectedCategory);
        break;
      case "postCategoryForm":
        this.props.postStaffPick(formData);
      default:
        return null;
    }
  };
  
  categoriesList = () => {
    // console.log("cat", this.props.categories);
    return this.props.categories.map(categorie => {
      return (
        <option name={categorie._id} value={categorie._id}>
          {categorie.title}
        </option>
      );
    });
  };
  form = (categoryForm, selectedCategory) => {
    // console.log(selectedCategory);
    return (
      <div className="row">
        {categoryForm === "editCategoryForm" ? (
          <div>
            <div>old category : {selectedCategory.title}</div>
          </div>
        ) : null}
        <div className="col-sm-12 col-md-6">
          <form
            onSubmit={event =>
              this.handleSubmit(event, categoryForm, selectedCategory)
            }
          >
            <input type="file" name="img" />
            <select name="category" ref="category">
                <option name="select" value="select">
                  select
                </option>
                {this.categoriesList()}
              </select>
              <button type="submit" className="btn btn-primary">
                Save book
              </button>
          </form>
        </div>
      </div>
    );
  };

  render() {
    const { categoryForm, selectedCategory } = this.props;
    switch (categoryForm) {
      case "postCategoryForm":
        return this.form(categoryForm);

      case "editCategoryForm":
        return <div>{this.form(categoryForm, selectedCategory)}</div>;
    }
  }
}

export default StaffPickForm;
