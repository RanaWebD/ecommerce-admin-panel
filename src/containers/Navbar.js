import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getDepartments } from "../store/actions/departmentActions";
import { getCategories } from "../store/actions/categoriesActions";
import { getGenres } from "../store/actions/genreActions";
import { logout } from "../store/actions/auth";

// CSS FILE
import "../CSS/navbar.css";
// import Logo from "../images/warbler-logo.png";
const cartBtn = require("../assests/icons/shopping-bag.png");
const profileBtn = require("../assests/icons/user.png");
const logo = require("../assests/icons/logo.png");

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}

  logout = e => {
    e.preventDefault();
    this.props.logout();
  };

  renderAdimNavbar = () => {
    return (
      <div style={{ boxShadow: "0.5px 2.5px whitesmoke" }}>
        <header className="container">
          <nav>
            <div className="logo">
              K A P D A G R A M{/* <img src={logo} width="50" height="70" /> */}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {this.props.currentUser.isAuthenticated ? (
                <div className="nav-item active dropdown">
                  <img
                    src={profileBtn}
                    alt="user button icon"
                    height="24"
                    width="24"
                    style={{ cursor: "pointer" }}
                  />

                  <div className="profile-dropdown-content">
                    <div>
                      <div>
                        <Link className="Link" to="orders">
                          email id
                        </Link>
                      </div>
                      <div>
                        <button className="nav-link" onClick={this.logout}>
                          Log out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Link to="/admin/signin" style={{ marginRight: 15 }}>
                    <img
                      src={profileBtn}
                      alt="user button icon"
                      height="24"
                      width="24"
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </header>
      </div>
    );
  };

  render() {
    return this.renderAdimNavbar();
  }
}

function mapStateToProps({ currentUser, departments, genres, categories }) {
  return {
    currentUser,
    departments,
    genres,
    categories
  };
}

export default connect(
  mapStateToProps,
  { getDepartments, getCategories, getGenres, logout }
)(Navbar);
