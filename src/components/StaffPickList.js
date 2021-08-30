import React, { Component } from "react";
// COMPONENTS
import StaffPickForm from "./StaffPickForm";
import StaffPickListItem from "../components/StaffPickListItem";

class StaffPickList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentComponent: "categoriesList",
      categoryForm: "",
      selectedCategory: null
    };
  }

  editBtnCall = (currentComponent, categoryForm, selectedCategory) => {
    this.setState({currentComponent, categoryForm, selectedCategory });
  };

  renderComponent = () => {
    switch (this.state.currentComponent) {
      case "categoriesList":
        return (
          <StaffPickListItem
            staffPick={this.props.staffPick}
            editBtnCall={this.editBtnCall}
            deleteStaffPick={this.props.deleteStaffPick}
          />
        );
      case "categoryForms":
        return (
          <StaffPickForm
            categoryForm={this.state.categoryForm}
            selectedCategory={this.state.selectedCategory}
            categories={this.props.categories}
            postStaffPick={this.props.postStaffPick}
            updateStaffPick={this.props.updateStaffPick}
            
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <div>
        <button
          onClick={() => this.setState({ currentComponent: "categoriesList" })}
        >
          categories
        </button>
        <button
          onClick={() =>
            this.setState({ currentComponent: "categoryForms", categoryForm: "postCategoryForm" })
          }
        >
          add category
        </button>
        {this.renderComponent()}
      </div>
    );
  }
}

export default StaffPickList;
