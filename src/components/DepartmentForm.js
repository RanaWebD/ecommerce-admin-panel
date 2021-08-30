import React, { Component } from "react";
import { findDOMNode } from "react-dom";

class DepartmentForm extends Component {
  handleSubmit = (event, departmentForm, selectedDepartment) => {
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
    switch (departmentForm) {
      case "editDepartmentForm":
      console.log("sele", selectedDepartment)
        return this.props.editDepartment(
          this.props.currentUser.user.id,
          data,
          selectedDepartment._id
        );
      case "postDepartmentForm":
        return this.props.postDepartment(this.props.currentUser.user.id, data);
      default:
        return null;
    }
  };

  form = (departmentForm, selectedDepartment) => {
    return (
      <div className="row">
        {departmentForm === "editDepartmentForm" ? (
          <div>
            <div>old department : {selectedDepartment.title}</div>
          </div>
        ) : null}
        <div className="col-sm-12 col-md-6">
          <form
            onSubmit={event =>
              this.handleSubmit(event, departmentForm, selectedDepartment)
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
    const { departmentForm, selectedDepartment } = this.props;
    switch (departmentForm) {
      case "postDepartmentForm":
        return this.form(departmentForm);

      case "editDepartmentForm":
        return this.form(departmentForm, selectedDepartment);
      default:
        return null;
    }
  }
}

export default DepartmentForm;
