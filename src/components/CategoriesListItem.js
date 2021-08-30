import React from "react";
import "../CSS/productsListItem.css";
import deleteBtn from "../assests/icons/delete-button.png";

const CategoriesListItem = ({
  categories,
  editBtnCall,
  deleteCategory,
  currentUser
}) => {
  console.log("afsdfsldkjflsadjfklsjfklsadjf", categories);
  if (categories.length > 0) {
    return categories.map((category, i) => {
      return (
        <div key={i} className="col-sm-4">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid whitesmoke",
              padding: 5
            }}
          >
            <div>
              <div>{category.title}</div>
              <div>{category.description}</div>
            </div>
            <div style={{ display: "flex" }}>
              <button
                onClick={() => {
                  editBtnCall("categoryForms", "editCategoryForm", category);
                }}
              >
                edit
              </button>
              <img
                src={deleteBtn}
                alt="delete button"
                width="30"
                height="30"
                onClick={() => {
                  deleteCategory(currentUser.user.id, category._id);
                }}
              />
            </div>
          </div>
        </div>
      );
    });
  } else {
    return <div>empty</div>;
  }
};

export default CategoriesListItem;
