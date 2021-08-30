import React, { Component } from "react";
// COMPONENTS
import CategoryForm from "./CategoryForm";
import CategoriesListItem from "../components/CategoriesListItem";
// CSS
import "../CSS/categoriesList.css";

class CategoriesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentComponent: "categoriesList",
      categoryForm: "",
      selectedCategory: null
    };
  }

  editBtnCall = (currentComponent, categoryForm, selectedCategory) => {
    this.setState({ currentComponent, categoryForm, selectedCategory });
  };

  renderComponent = () => {
    switch (this.state.currentComponent) {
      case "categoriesList":
        return (
          <CategoriesListItem
            currentUser={this.props.currentUser}
            categories={this.props.categories}
            editBtnCall={this.editBtnCall}
            deleteCategory={this.props.deleteCategory}
          />
        );
      case "categoryForms":
        return (
          <CategoryForm
            currentUser={this.props.currentUser}
            departments={this.props.departments}
            categoryForm={this.state.categoryForm}
            selectedCategory={this.state.selectedCategory}
            editCategory={this.props.editCategory}
            postCategory={this.props.postCategory}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="row" id="categories-list-container">
        <div className="col-sm-3" id="categories-list-side-navbar-container">
          <button
            className="btn categories-list-side-nav-btn"
            onClick={() =>
              this.setState({ currentComponent: "categoriesList" })
            }
          >
            categories
          </button>
          <button
            className="btn categories-list-side-nav-btn"
            onClick={() =>
              this.setState({
                currentComponent: "categoryForms",
                categoryForm: "postCategoryForm"
              })
            }
          >
            add category
          </button>
        </div>
        <div className="col-sm-9">
          <div className="row">{this.renderComponent()}</div>
        </div>
      </div>
    );
  }
}

export default CategoriesList;
