import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Import Components
import AuthForm from "../components/AuthForm";
import Navbar from "./Navbar";
// Admin Panel
import AdminPanel from "./AdminPanel";
import ProductPage from "./ProductPage";
import ProductForm from "../components/ProductForm";
import OrderPage from "./OrderPage";
// Actions
import { authUser } from "../store/actions/auth";

const Main = props => {
  const { authUser, errors, currentUser } = props;
    return (
      <div>
        <Navbar currentUser={currentUser} {...props} />
        <Switch>
          <Route
            exact
            path="/admin/signin"
            render={props => {
              return (
                <AuthForm
                  errors={errors}
                  onAuth={authUser}
                  buttonText="Signin"
                  heading="Welcome Back."
                  pushPath="/"
                  {...props}
                />
              );
            }}
          />
          <Route exact path="/admin" component={AdminPanel} />
          <Route
            exact
            path="/products/:product_id"
            component={ProductPage}
          />
          <Route
            exact
            path="/orders/:order_id"
            component={OrderPage}
          />
          {/* // <Route exact path="/admin/product_form" component={ProductForm} /> */}
  
          {/* Admin Routes */}
          <Route exact path="/admin/product/edit/:id" component={ProductForm} />
        </Switch>
      </div>
    );
};

function mapStateToProps(state) {
  return {
    errors: state.errors,
    currentUser: state.currentUser
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { authUser }
  )(Main)
);
