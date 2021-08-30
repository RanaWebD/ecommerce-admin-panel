import React, { Component } from "react";
// COMPONENT
import ProductsListItem from "../components/ProductsListItem";
import ProductForm from "./ProductForm";
// CSS
import "../CSS/productsList.css";

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredProducts: this.props.products,
      currentComponent: "productsList",
      productFormType: "",
      editProduct: null,
      editVariant: null
    };
  }

  filterProducts = category => {
    // use filterProducts variable for saving the filtered products
    let filterProducts = [];
    this.props.products.map(product => {
      // make sure prduct has categorie id
      if (product.category !== undefined) {
        //campare the product categorie to categorie
        if (product.category === category._id) {
          filterProducts.push(product);
          // update the filteredProducts state variable
          this.setState({ filteredProducts: filterProducts });
        }
      }
    });
  };

  fetchedCategories = () => {
    return this.props.categories.map((category, i) => {
      return (
        <button
          key={i}
          onClick={() => this.filterProducts(category)}
          className="btn categorie"
        >
          {category.title}
        </button>
      );
    });
  };

  editBtnCall = (
    currentComponent,
    productFormType,
    editProduct,
    editVariant
  ) => {
    this.setState({
      currentComponent,
      productFormType,
      editProduct,
      editVariant
    });
  };

  renderComponent = () => {
    switch (this.state.currentComponent) {
      case "productsList":
        return (
          <div className="row">
            <ProductsListItem
              currentUser={this.props.currentUser}
              products={this.state.filteredProducts}
              editBtnCall={this.editBtnCall}
              deleteProduct={this.props.deleteProduct}
              updateProduct={this.props.updateProduct}
            />
          </div>
        );
      case "productForm":
        return (
          <ProductForm
            currentUser={this.props.currentUser}
            departments={this.props.departments}
            genres={this.props.genres}
            productFormType={this.state.productFormType}
            categories={this.props.categories}
            editProduct={this.state.editProduct}
            editVariant={this.state.editVariant}
            postProduct={this.props.postProduct}
          />
        );
      default:
        return null;
    }
  };

  render() {
    // console.log(this.props);
    return (
      <div className="row" id="product-list-container">
        {/* <div xs={12} id="categories">
          {this.fetchedCategories()}
        </div> */}
        <div className="col-sm-3">
          <button
            className="btn product-list-post-btn"
            onClick={() => {
              this.setState({
                currentComponent: "productForm",
                productFormType: "postForm"
              });
            }}
          >
            POST PRODUCT
          </button>
        </div>
        <div className="col-sm-9">{this.renderComponent()}</div>
      </div>
    );
  }
}

export default ProductsList;
