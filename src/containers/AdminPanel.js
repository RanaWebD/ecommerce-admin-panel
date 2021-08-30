import React, { Component } from "react";
import { connect } from "react-redux";
//IMPORT ACTIONS
import {
  getDepartments,
  postDepartment,
  editDepartment,
  deleteDepartment
} from "../store/actions/departmentActions";
import {
  getGenres,
  postGenre,
  editGenre,
  dGenre,
  deleteGenre
} from "../store/actions/genreActions";
import {
  getProducts,
  deleteProduct,
  postProduct,
  updateProduct
} from "../store/actions/products";
import {
  getCategories,
  postCategory,
  editCategory,
  deleteCategory
} from "../store/actions/categoriesActions";
import {
  getStaffPick,
  postStaffPick,
  updateStaffPick,
  deleteStaffPick
} from "../store/actions/staffPickActions";
import DepartmentsList from "../components/DepartmentsList";
import GenresList from "../components/GenresList";
import ProductsList from "../components/ProductsList";
import CategoriesList from "../components/CategoriesList";
import Orders from "../components/Orders";
import StaffPickList from "../components/StaffPickList";
import { getOrders, cancelOrder } from "../store/actions/orderActions";
// Loader
import { StageSpinner } from "../assests/stage/index";

import "../CSS/adminPanel.css";

class AdminPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      departments: [],
      categories: [],
      genres: [],
      products: [],
      orders: [],
      staffPick: [],
      currentComponent: "products"
    };
  }

  componentDidMount() {
    this.props.getDepartments();
    this.props.getCategories();
    this.props.getProducts();
    this.props.getGenres();
    this.props.getStaffPick();
    this.props.getOrders(this.props.currentUser.user.id);
  }

  componentWillReceiveProps(nextprops) {
    // console.log("nextprops", nextprops);
    // // load display Loader element block
    // let loader = document.querySelector(".loader-content");
    // // remove loader from screen
    // loader.style.display = "none";
    // console.log("adminpanelprops", nextprops)
    this.setState({
      departments: nextprops.departments.departments,
      categories: nextprops.categories.categories,
      products: nextprops.products.products,
      genres: nextprops.genres.genres,
      orders: nextprops.orders.orders,
      staffPick: nextprops.staffPick,
      loading: false
    });
  }

  renderComponent = () => {
    switch (this.state.currentComponent) {
      case "departments":
        return (
          <DepartmentsList
            editDepartment={this.props.editDepartment}
            currentUser={this.props.currentUser}
            categories={this.state.categories}
            departments={this.state.departments}
            deleteDepartment={this.props.deleteDepartment}
            postDepartment={this.props.postDepartment}
            updateDepartment={this.props.updateDepartment}
          />
        );
      case "genres":
        return (
          <GenresList
            currentUser={this.props.currentUser}
            genres={this.state.genres}
            editGenre={this.props.editGenre}
            dGenre={this.props.dGenre}
            deleteGenre={this.props.deleteGenre}
            postGenre={this.props.postGenre}
            updateGenre={this.props.updateGenre}
          />
        );
      case "products":
        return (
          <ProductsList
            currentUser={this.props.currentUser}
            departments={this.state.departments}
            categories={this.state.categories}
            products={this.state.products}
            genres={this.state.genres}
            deleteProduct={this.props.deleteProduct}
            postProduct={this.props.postProduct}
            updateProduct={this.props.updateProduct}
          />
        );

      case "categories":
        return (
          <CategoriesList
            currentUser={this.props.currentUser}
            departments={this.state.departments}
            categories={this.state.categories}
            postCategory={this.props.postCategory}
            editCategory={this.props.editCategory}
            deleteCategory={this.props.deleteCategory}
          />
        );
      case "staffPick":
        return (
          <StaffPickList
            staffPick={this.state.staffPick}
            categories={this.state.categories}
            postStaffPick={this.props.postStaffPick}
            updateStaffPick={this.props.updateStaffPick}
            deleteStaffPick={this.props.deleteStaffPick}
          />
        );
      case "orders":
        return (
          <Orders
            currentUser={this.props.currentUser}
            orders={this.state.orders}
            cancelOrder={this.props.cancelOrder}
            currentUser={this.props.currentUser}
          />
        );
      default:
        return null;
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "92vh"
          }}
        >
          <StageSpinner
            size={80}
            color="#686769"
            loading={this.state.loading}
          />
        </div>
      );
    } else {
      // if (this.props.currentUser.isAuthenticated) {
        return (
          <div>
            <div id="admin-panel-text">Panel</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%"
              }}
            >
              <button
                className="btn admin-panel-navbar"
                onClick={() =>
                  this.setState({ currentComponent: "departments" })
                }
              >
                DEPARTMENTS
              </button>
              <button
                className="btn admin-panel-navbar"
                onClick={() =>
                  this.setState({ currentComponent: "categories" })
                }
              >
                CATEGORIES
              </button>
              <button
                className="btn admin-panel-navbar"
                onClick={() => this.setState({ currentComponent: "products" })}
              >
                PRODUCTS
              </button>
              <button
                className="btn admin-panel-navbar"
                onClick={() => this.setState({ currentComponent: "genres" })}
              >
                GENRES
              </button>
              {/* <button
            onClick={() => this.setState({ currentComponent: "staffPick" })}
          >
            STAFF PICK
          </button> */}

              <button
                className="btn admin-panel-navbar"
                onClick={() => this.setState({ currentComponent: "orders" })}
              >
                ORDERS
              </button>
            </div>
            {this.renderComponent()}
          </div>
        );
      // } else {
      //   return <div>{this.props.history.push("/admin/signin")}</div>;
      // }
    }
  }
}

function mapStateToProps({
  departments,
  genres,
  products,
  categories,
  currentUser,
  orders,
  cancelOrder,
  staffPick
}) {
  return {
    departments,
    genres,
    products,
    categories,
    currentUser,
    orders,
    cancelOrder,
    staffPick
  };
}

export default connect(
  mapStateToProps,
  {
    getDepartments,
    postDepartment,
    editDepartment,
    deleteDepartment,
    getGenres,
    postGenre,
    editGenre,
    deleteGenre,
    getProducts,
    deleteProduct,
    postProduct,
    updateProduct,
    getCategories,
    postCategory,
    editCategory,
    dGenre,
    deleteCategory,
    getOrders,
    cancelOrder,
    getStaffPick,
    updateStaffPick,
    postStaffPick,
    deleteStaffPick
  }
)(AdminPanel);
