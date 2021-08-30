import React, { Component } from "react";
// COMPONENTS
import DepartmentForm from "./DepartmentForm";
import DepartmentsListItem from "../components/DepartmentsListItem";
// CSS
import "../CSS/departmentsList.css";

class DepartmentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentComponent: "departmentsList",
      departmentForm: "",
      selectedDepartment: null
    };
  }

  editBtnCall = (currentComponent, departmentForm, selectedDepartment) => {
    return this.setState({
      currentComponent,
      departmentForm,
      selectedDepartment
    });
  };

  renderComponent = () => {
    switch (this.state.currentComponent) {
      case "departmentsList":
        return (
          <DepartmentsListItem
            currentUser={this.props.currentUser}
            departments={this.props.departments}
            editBtnCall={this.editBtnCall}
            deleteDepartment={this.props.deleteDepartment}
          />
        );
      case "departmentForms":
        console.log("dev", this.props.currentUser);
        return (
          <DepartmentForm
            currentUser={this.props.currentUser}
            departmentForm={this.state.departmentForm}
            selectedDepartment={this.state.selectedDepartment}
            editDepartment={this.props.editDepartment}
            postDepartment={this.props.postDepartment}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="row" id="department-list-container">
        <div className="col-sm-3" id="department-list-side-navbar-container">
          <button
            className="btn departments-list-side-nav-btn"
            onClick={() =>
              this.setState({ currentComponent: "departmentsList" })
            }
          >
            Departments
          </button>
          <button
            className="btn  departments-list-side-nav-btn"
            onClick={() =>
              this.setState({
                currentComponent: "departmentForms",
                departmentForm: "postDepartmentForm"
              })
            }
          >
            add Department
          </button>
        </div>
        <div className="col-sm-9">
          <div className="row">{this.renderComponent()}</div>
        </div>
      </div>
    );
  }
}

export default DepartmentsList;
