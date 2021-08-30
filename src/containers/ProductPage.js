import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProduct,
  updateProduct,
  deleteProduct
} from "../store/actions/products";
import {
  createVariant,
  updateVariant,
  deleteVariant
} from "../store/actions/variantActions";
import { findDOMNode } from "react-dom";
import favoriteBtn from "../assests/icons/heart.png";

// COMPONENT
// Loader
import { StageSpinner } from "../assests/stage/index";

// CSS
import "../CSS/productPage.css";

class Proudct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      variant: null,
      selectedVariant: null,
      mainImg: null,
      error: false,
      addVariantForm: [],
      addSpecificationForm: []
    };
    this.variantForm = [];
    this.specificationForm = [];
    this.productUpdateObject = {};
  }

  componentDidMount() {
    alert("kjhj");
    this.props.getProduct(this.props.match.params.product_id);
  }

  componentWillReceiveProps(nextProps) {
    if ("variants" in nextProps.product) {
      nextProps.product.variants.map(variant => {
        if (variant._id === this.props.match.params.variant_id) {
          return this.setState({ variant, mainImg: variant.assests.imgs[0] });
        }
      });
    }
    return this.setState({
      product: nextProps.product
    });
  }

  renderImgs = variant => {
    return variant.assests.imgs.map((img, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            this.setState({ mainImg: img });
          }}
          style={{
            height: 63,
            width: 63,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer"
          }}
        >
          <img src={img} alt="Smiley face" width="53" height="53" />
        </div>
      );
    });
  };

  renderSpecification = () => {
    return this.state.product.specifications.map((item, i) => {
      return (
        <div key={i} className="col">
          <div>{item.name}</div>
          <div>{item.value}</div>
          <hr />
        </div>
      );
    });
  };

  changeVariant = async (product, variants, variant) => {
    await this.props.history.push(
      `/products/${product._id}/variant/${variant._id}`
    );

    variants.map(variant => {
      if (variant._id === this.props.match.params.variant_id) {
        return this.setState({ variant, mainImg: variant.assests.imgs[0] });
      }
    });
  };

  filterDuplicateColors = (product, variants) => {
    return variants.map((variant, i) => {
      let activeColorBtnClass =
        this.state.variant !== null
          ? this.state.variant.attributes.color === variant.attributes.color
            ? " activeColorBtn"
            : null
          : null;
      let backgroundColorClass = ` ${variant.attributes.color} `;

      return (
        <Link
          key={i}
          to={`/products/${product._id}/variant/${variant._id}`}
          style={{
            backgroundColor: ` ${variant.attributes.color} `
          }}
          onClick={() => {
            this.changeVariant(product, variants, variant);
          }}
          className={"colorBtn " + backgroundColorClass + activeColorBtnClass}
        />
      );
    });
  };

  // filter sizes depends on user selected item color
  filterSize = variants => {
    return variants.map((variant, index) => {
      console.log(variant);
      return variant.attributes.size;
    });
  };

  updateVariant = (variant, i) => {
    let formData = new FormData();
    // let sku = `#sku${i + 1}`;
    let size = `#admin-variant-update-sizes-${i + 1}`;
    let file = `#admin-update-imgs-file${i + 1}`;

    // Get product elements from document
    // let skuValue = document.querySelector(sku).value;
    let sizeValue = document.querySelector(size).value;
    let variantFile = document.querySelector(file);
    console.log(size, variantFile);
    // console.log("d", skuValue, colorValue, sizeValue, variantFile.files);
    let sizeArr = sizeValue.split(",");
    if (!!sizeValue) {
      formData.append("sizes", sizeValue);
    }
    formData.append("color", variant.attributes.color);

    // Loop through each of the selected files.
    for (let i = 0; i < variantFile.files.length; i++) {
      let file = variantFile.files[i];
      // Check the file type.
      if (!file.type.match("image.*")) {
        continue;
      }

      // Add the file to the request.
      formData.append("imgs", file);
    }
    console.log("value", sizeValue, variantFile);
    if (!!sizeValue || variantFile) {
      console.log("did");
      this.props.updateVariant(
        this.props.currentUser.user._id,
        variant._id,
        formData
      );
    }
  };

  renderVariants = product => {
    let variantImgsKey = new Date().getTime();
    return product.variants.map((variant, i) => {
      return (
        <div className="col">
          <div className="variant-container">
            {this.renderImgs(variant)}{" "}
            <div>
              <label for="img">select photos</label>
              <input
                type="file"
                multiple
                id={`admin-update-imgs-file${i + 1}`}
              />
            </div>
          </div>
          <div className="admin-color-container">{`color:  ${
            variant.attributes.color
          }`}</div>
          <div className="admin-size-container">
            size:{" "}
            <input
              id={`admin-variant-update-sizes-${i + 1}`}
              placeholder={variant.attributes.size}
            />
          </div>
          <div className="admin-variant-update-delete-btn-container">
            <button
              className="btn btn-danger"
              onClick={() => {
                this.props.deleteVariant(
                  this.props.currentUser.user.id,
                  variant._id
                );
              }}
            >
              Delete
            </button>
            <button
              className="btn update-variant-btn"
              onClick={() => {
                this.updateVariant(variant, i);
              }}
            >
              Update
            </button>
          </div>
        </div>
      );
    });
  };

  addSpecification = () => {
    this.specificationForm.push(
      <div className="admin-specification-container">
        <div>
          <small>name</small>
          <br />
          <input
            type="text"
            placeholder="Enter specification name"
            name="specificationName"
            className="input-group-sm"
            id={`specificationName${this.specificationForm.length + 1}`}
          />
        </div>
        <div>
          <small>value</small>
          <br />
          <input
            type="text"
            placeholder="Enter specification value"
            name="specificationValue"
            id={`specificationValue${this.specificationForm.length + 1}`}
          />
        </div>
      </div>
    );
    this.setState({ addSpecificationForm: this.specificationForm });
  };

  addVariant = product_id => {
    console.log(this.props.currentUser.user.id);
    let formData = new FormData();
    // Get product elements from document
    let colorValue = document.querySelector("#color").value;
    let sizeValue = document.querySelector("#size").value;
    let variantFile = document.querySelector("#file");
    formData.append("sizes", sizeValue);
    formData.append("color", colorValue);
    formData.append("product_id", product_id);
    // Loop through each of the selected files.
    for (let i = 0; i < variantFile.files.length; i++) {
      let file = variantFile.files[i];

      // Check the file type.
      if (!file.type.match("image.*")) {
        continue;
      }

      // Add the file to the request.
      formData.append("imgs", file);
    }
    console.log("update", colorValue, sizeValue);
    this.props.createVariant(this.props.currentUser.user.id, formData);
  };

  updateProduct = product => {
    let productData = {};
    let titleValue = findDOMNode(this.refs.title).value;
    let descriptionValue = findDOMNode(this.refs.description).value;
    let sell_priceValue = findDOMNode(this.refs.sell_price).value;

    if (!!titleValue) {
      productData.title = titleValue;
    }
    if (!!descriptionValue) {
      productData.description = descriptionValue;
    }
    if (!!sell_priceValue) {
      productData.prices = {};
      productData.prices.sell_price = sell_priceValue;
    }

    if (!!this.specificationForm.length) {
      productData.specifications = [];
    }

    this.specificationForm.map((specification, i) => {
      let specificationName = `#specificationName${i + 1}`;
      let specificationValue = `#specificationValue${i + 1}`;

      // Get product elements from document
      let name = document.querySelector(specificationName).value;
      let value = document.querySelector(specificationValue).value;

      if (!!name && !!value) {
        let specificationObject = {
          name,
          value
        };

        productData.specifications.push(specificationObject);
      }
    });
    console.log("pd", productData);
    this.props.updateProduct(
      this.props.currentUser.user.id,
      product._id,
      productData
    );
  };

  render() {
    const { product } = this.state;
    if ("title" in product) {
      return (
        <div className="container" id="admin-product-page-content-container">
          <div id="admin-product-delete-btn-container">
            <button
              className="btn btn-danger"
              onClick={() => this.deleteProduct(product._id)}
            >
              Delete Product
            </button>
          </div>
          <div className="row" style={{ marginTop: "50px" }}>
            <div className="col-md-6">
              <p className="admin-product-title">{product.title}</p>
              <p className="admin-product-price">
                ₹{product.prices.sell_price}
              </p>
              <div>
                <p className="admin-product-description-title">
                  PRODUCT DETAILS
                </p>
                <p>{product.description}</p>
                <div>
                  <p className="admin-product-description-title">
                    Specifications
                  </p>
                  <div className="row">{this.renderSpecification()}</div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <small>title</small>
                <br />
                <textarea placeholder="" id="new title" ref="title" />
              </div>
              <div>
                <small>price</small>
                <br />
                <input placeholder="" id="new price" ref="sell_price" />
              </div>
              <div>
                <small>description</small>
                <br />
                <textarea
                  placeholder=""
                  id="new description"
                  ref="description"
                />
              </div>
              <div>
                <div id="specification-form">
                  {this.state.addSpecificationForm.map(form => {
                    return form;
                  })}
                </div>
                <button
                  onClick={() => {
                    this.addSpecification();
                  }}
                >
                  Add Specification
                </button>
              </div>
            </div>
          </div>
          <div id="admin-product-update-btn-container">
            <button
              className="btn"
              id="admin-product-update-btn"
              onClick={() => {
                this.updateProduct(product);
              }}
            >
              Update Product
            </button>
          </div>
          <div>
            <div>
              <hr />
              <div>Variants</div>
              <div className="row">{this.renderVariants(product)}</div>
            </div>
            <div>
              <hr />
              <div>Create New Variant</div>
              <div id="variant-form">
                <div>
                  <div>
                    <small>color</small>
                    <br />
                    <input
                      type="text"
                      placeholder="Enter color"
                      name="color"
                      id="color"
                    />
                  </div>
                  <div>
                    <small>size</small>
                    <br />
                    <input
                      type="text"
                      placeholder="Enter size"
                      name="size"
                      id="size"
                    />
                  </div>
                  <div>
                    <label for="img">select photos</label>
                    <input type="file" multiple id="file" />
                  </div>
                </div>
              </div>
              <div id="admin-add-variant-btn-container">
                <button
                  className="btn"
                  id="admin-add-variant-btn"
                  onClick={() => {
                    this.addVariant(product._id);
                  }}
                >
                  Add Variant
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "92vh"
          }}
        >
          <StageSpinner size={80} color="#686769" loading={true} />
        </div>
      );
    }
  }
}

function mapStateToProps({ product, currentUser }) {
  return { product, currentUser };
}

export default connect(
  mapStateToProps,
  {
    getProduct,
    updateProduct,
    deleteProduct,
    createVariant,
    updateVariant,
    deleteVariant
  }
)(Proudct);
