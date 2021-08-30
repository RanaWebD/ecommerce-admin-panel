import React from "react";
import { connect } from "react-redux";
import { getProduct } from "../store/actions/products";
import { Link } from "react-router-dom";
import "../CSS/productsListItem.css";

const renderColors = () => {
  return <div>blue</div>;
};

const renderSizes = () => {
  return <div>M</div>;
};

const filterDuplicateColors = (product, variants) => {
  console.log("varinats", product);
  let filteredVariant = variants.filter((variant, index, self) => {
    return (
      index ===
      self.findIndex(v => v.attributes.color === variant.attributes.color)
    );
  });
  return filteredVariant.map((variant, i) => {
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
const filterSize = variants => {
  // make a variable for storing the user selected variant
  let userSelectedVariantData = null;
  return variants.map((variant, index, arr) => {
    // itrate through the all varinats of this product and fetch user selected variant from the variants
    if (variant._id === this.props.match.params.variant_id) {
      // now we have userSelectedVariant, store it into userSelectedVariantData variable
      userSelectedVariantData = variant;
    }
    // In this block of code we compare the userSelectedVarient color to all variants color so that we can
    // get all variant which have the same color value.
    // compare the userSelectedVariant color to all variants color
    if (userSelectedVariantData !== null) {
      if (
        userSelectedVariantData.attributes.color === arr[index].attributes.color
      ) {
        let sizeBtnClass =
          this.state.selectedVariant !== null
            ? this.state.selectedVariant.attributes.size ===
              variant.attributes.size
              ? " sizeBackgroundColor"
              : null
            : null;
        // In this scope we only have access to the variants which have same color value of userSelectedVariant.
        return (
          <div
            key={index}
            className={"sizeBtn " + sizeBtnClass}
            onClick={() => {
              this.setState({
                selectedVariant: variant,
                error: false
              });
            }}
          >
            {variant.attributes.size}
          </div>
        );
      }
    }
  });
};

const ProductsListItem = ({ products, deleteProduct, editBtnCall }) => {
  return products.map((product, i) => {
    return (
      <Link
        key={i}
        to={`products/${product._id}`}
        className="col-sm-6 col-lg-3 productListItemCard"
        style={{ color: "black", textDecoration: "none" }}
      >
        <div style={{ margin: "10px 0" }}>
          {/* <img
            src={variant.assests.imgs[0]}
            alt="product img"
            style={{ width: "100%", height: "auto" }}
          /> */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h6>{product.title}</h6>
            <div style={{ display: "flex" }}>
              <span style={{ fontSize: "16px", fontWeight: 500 }}>
                ₹{product.prices.sell_price}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  });
};

export default connect(
  null,
  { getProduct }
)(ProductsListItem);

// return product.variants.map(variant => {
//   return (
//     <div
//       className="col-sm-6 col-lg-3 productListItemCard"
//       style={{ color: "black", textDecoration: "none" }}
//     >
//       <div style={{ margin: "10px 0" }}>
//         <img
//           src={variant.assests.imgs[0]}
//           alt="product img"
//           style={{ width: "100%", height: "auto" }}
//         />
//         <div style={{display: 'flex', justifyContent: 'space-between'}}>
//         <h6>{product.title}</h6>
//         <div style={{ display: "flex" }}>
//           <span style={{ fontSize: "16px", fontWeight: 500 }}>
//             ₹{product.prices.sell_price}
//           </span>

//           {/* <div style={{ marginLeft: 5 }}>
//             <hr style={{ margin: 0, borderColor: "green" }} />
//             <div style={{ fontSize: "14px", lineHeight: "21px" }}>
//               {product.prices.mrp}
//             </div>
//           </div> */}
//           {/* <div
//             style={{ fontSize: "13px", marginLeft: 5, color: "#388e3c" }}
//           >
//             <div>{product.prices.discount}% off</div>
//           </div>
//           <div /> */}
//         </div>
//         </div>
//         <div>size {renderSizes()}</div>
//         <div>color {renderColors()}</div>
//         <button
//           onClick={() => {
//             editBtnCall("productForm", "editForm", product, variant);
//           }}
//         >
//           edit
//         </button>
//         <button
//           onClick={() => {
//             deleteProduct(product._id);
//           }}
//         >
//           delete
//         </button>
//       </div>
//     </div>
//   );
// });
