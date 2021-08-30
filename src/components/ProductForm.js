import React, { Component } from "react";
import { findDOMNode } from "react-dom";

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // mrp: 0,
      sell_price: 0,
      addVariantForm: [],
      addSpecificationForm: []
    };
    this.variantForm = [];
    this.specificationForm = [];
    this.productUpdateObject = {};
  }

  handleSubmit = (event, productFormType, editProduct) => {
    event.preventDefault();
    let productData = {};
    let departmentValue = findDOMNode(this.refs.department).value;
    let categoryValue = findDOMNode(this.refs.category).value;
    let genreValue = findDOMNode(this.refs.genre).value;
    let titleValue = findDOMNode(this.refs.title).value;
    let sell_priceValue = findDOMNode(this.refs.sell_price).value;

    if (this.variantForm.length) {
      productData.variants = [];
    }
    if (this.specificationForm.length) {
      productData.specifications = [];
    }

    if (departmentValue !== "select") {
      productData.department = departmentValue;
    }
    if (categoryValue !== "select") {
      productData.category = categoryValue;
    }
    if (genreValue !== "select") {
      productData.genre = genreValue;
    }
    if (!!titleValue) {
      productData.title = titleValue;
    }
    if (!!sell_priceValue) {
      productData.sell_price = sell_priceValue;
    }

    let formData = new FormData();

    this.variantForm.map((item, i) => {
      // let sku = `#sku${i + 1}`;
      let color = `#color${i + 1}`;
      let size = `#size${i + 1}`;
      let file = `#file${i + 1}`;

      // Get product elements from document
      // let skuValue = document.querySelector(sku).value;
      let colorValue = document.querySelector(color).value;
      let sizeValue = document.querySelector(size).value;
      let variantFile = document.querySelector(file);

      // console.log("d", skuValue, colorValue, sizeValue, variantFile.files);
      let sizeArr = sizeValue.split(",");
      let variantObject = {
        // sku: skuValue,
        color: colorValue,
        size: sizeArr
      };
      console.log("vA", variantObject)
      // Loop through each of the selected files.
      for (let i = 0; i < variantFile.files.length; i++) {
        let file = variantFile.files[i];

        // Check the file type.
        if (!file.type.match("image.*")) {
          continue;
        }

        // Add the file to the request.
        formData.append("imgs", file, colorValue);
      }

      // Push each variant into the product variants array
      productData.variants.push(variantObject);
    });

    this.specificationForm.map((specification, i) => {
      let specificationName = `#specificationName${i + 1}`;
      let specificationValue = `#specificationValue${i + 1}`;

      // Get product elements from document
      let name = document.querySelector(specificationName).value;
      let value = document.querySelector(specificationValue).value;

      let specificationObject = {
        name,
        value
      };

      productData.specifications.push(specificationObject);
    });

    // stringigy the product object and append it into formData
    formData.append("product", JSON.stringify(productData));

    // Send action according the product form type
    switch (productFormType) {
      case "editForm":
        return this.props.editProduct(this.props.currentUser.user.id, editProduct._id, productData);
      case "postForm":
        return this.props.postProduct(this.props.currentUser.user.id, formData);
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

  genresList = () => {
    return this.props.genres.map((genre, i) => {
      return (
        <option key={i} name={genre._id} value={genre._id}>
          {genre.title}
        </option>
      );
    });
  };

  categoriesList = () => {
    return this.props.categories.map((category, i) => {
      return (
        <option key={i} name={category._id} value={category._id}>
          {category.title}
        </option>
      );
    });
  };

  calculateDiscountPercentage = () => {
    if (this.state.mrp && this.state.sell_price > 0) {
      const discount = this.state.mrp - this.state.sell_price;
      const discountPercentage = (discount / this.state.mrp) * 100;
      return discountPercentage;
    }
    return 0;
  };

  editFormComponents = (productFormType, editProduct, editVariant) => {
    // console.log("edit", editProduct, editVariant);
    if (productFormType === "editForm") {
      return (
        <div style={{ display: "flex" }}>
          <div>
            <img src={editVariant.assests.imgs[0]} width="100" height="150" alt="product img" />
          </div>
          {/* <div>{editProduct.prices.mrp}</div> */}
          {/* <div>{editProduct.prices.discount}</div> */}
          <div>
            <div>
              <small>title</small>
              <div>{editProduct.title}</div>
            </div>
            <div>
              <small>description</small>
              <div>{editProduct.description}</div>
            </div>
            <div>
              <small>sell price</small>
              <div>{editProduct.prices.sell_price}</div>
            </div>

            <div>
              <small>size</small>
              <div>{editVariant.attributes.size}</div>
            </div>
            <div>
              <small>color</small>
              <div>{editVariant.attributes.color}</div>
            </div>
          </div>
        </div>
      );
    }
  };

  addSpecification = () => {
    this.specificationForm.push(
      <div>
        <div>
          <label for="specificationName">name</label>
          <input
            type="text"
            placeholder="Enter specification name"
            name="specificationName"
            id={`specificationName${this.specificationForm.length + 1}`}
          />
        </div>
        <div>
          <label for="specificationValue">value</label>
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

  addVariant = () => {
    // let sku = `sku${this.variantForm.length + 1}`;
    // let variantImgsKey = new Date().getTime();
    this.variantForm.push(
      <div>
        {/* <div>
          <label for="sku">sku</label>
          <input
            type="text"
            placeholder="Enter sku"
            name="sku"
            id={`sku${this.variantForm.length + 1}`}
          />
        </div> */}
        <div>
          <label for="color">color</label>
          <input
            type="text"
            placeholder="Enter color"
            name="color"
            id={`color${this.variantForm.length + 1}`}
          />
        </div>
        <div>
          <label for="size">size</label>
          <input
            type="text"
            placeholder="Enter size"
            name="size"
            id={`size${this.variantForm.length + 1}`}
          />
        </div>
        <div>
          <label for="img[]">select photos</label>
          <input
            type="file"
            // name={variantImgsKey}
            multiple
            id={`file${this.variantForm.length + 1}`}
          />
        </div>
      </div>
    );
    this.setState({ addVariantForm: this.variantForm });
    // console.log(this.variantForm);
  };

  render() {
    const { productFormType, editProduct, editVariant } = this.props;
    return (
      <div className="row">
        <div className="col-md-6">
          {this.editFormComponents(productFormType, editProduct, editVariant)}
        </div>
        <div className="col-md-6">
          <div id="product-form">
            <div>
              <select name="department" ref="department">
                <option name="select" value="select">
                  select depatment
                </option>
                {this.departmentsList()}
              </select>
            </div>
            <div>
              <select name="category" ref="category">
                <option name="select" value="select">
                  select category
                </option>
                {this.categoriesList()}
              </select>
            </div>
            <div>
              <select name="genre" ref="genre">
                <option name="select" value="select">
                  select genre
                </option>
                {this.genresList()}
              </select>
            </div>
            <div>
              <label for="title">title</label>
              <input
                type="text"
                placeholder="Enter Title"
                name="title"
                ref="title"
              />
            </div>
            <div>
              <label for="description">description</label>
              <input
                type="text"
                placeholder="Enter Description"
                ref="description"
                name="description"
              />
            </div>
            <div>
              <label for="sell price">sell price</label>
              <input
                onChange={event =>
                  this.setState({ sell_price: event.target.value })
                }
                type="number"
                placeholder="Enter Selling Price"
                ref="sell_price"
                name="sell_price"
              />
            </div>
            <div>
              {/* <label for="mrp">mrp</label> */}
              {/* <input
                onChange={event => this.setState({ mrp: event.target.value })}
                type="number"
                placeholder="Enter MRP"
                name="mrp"
                ref="mrp"
              /> */}
            </div>
            {/* <div>{this.calculateDiscountPercentage()}</div> */}
            <div>{}</div>
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
            <div>
              <div id="variant-form">
                {this.state.addVariantForm.map(form => {
                  return form;
                })}
              </div>
              <button
                onClick={() => {
                  this.addVariant();
                }}
              >
                Add Variant
              </button>
            </div>
            <button
              onClick={event =>
                this.handleSubmit(event, productFormType, editProduct)
              }
              type="submit"
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductForm;
