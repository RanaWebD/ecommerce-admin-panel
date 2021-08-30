import React, { Component } from "react";
import { findDOMNode } from "react-dom";

class CategoryForm extends Component {
  handleSubmit = (event, categoryForm, selectedCategory) => {
    event.preventDefault();
    let user_id = this.props.currentUser.user.id;
    let titleValue = findDOMNode(this.refs.title).value;
    let descriptionValue = findDOMNode(this.refs.description).value;
    let departmentValue = findDOMNode(this.refs.department).value;
    let data = {};

    if (departmentValue !== "select") {
      data.department = departmentValue;
    }
    if (titleValue !== "") {
      data.title = titleValue;
    }
    if (descriptionValue !== "") {
      data.description = descriptionValue;
    }
    switch (categoryForm) {
      case "editCategoryForm":
        return this.props.editCategory(user_id, data, selectedCategory._id);
      case "postCategoryForm":
        return this.props.postCategory(user_id, data);
      default:
        return null;
    }
  };
  departmentsList = () => {
    return this.props.departments.map((department, i) => {
      return (
        <option key={i} name={department._id} value={department._id}>
          {department.title}
        </option>
      );
    });
  };
  form = (categoryForm, selectedCategory) => {
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
            <div>
              <select name="department" ref="department">
                <option name="select" value="select">
                  select depatment
                </option>
                {this.departmentsList()}
              </select>
            </div>
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
      default:
        return null;
    }
  }
}

export default CategoryForm;
