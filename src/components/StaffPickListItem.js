import React from "react";
// import "../CSS/productsListItem.css";

const StaffPickListItem = ({ staffPick, editBtnCall, deleteStaffPick }) => {
  if (staffPick.length > 0) {
    return staffPick.map(item => {
      return (
        <div
          style={{
            width: "500px",
            height: 100,
            border: "1px solid lightgray"
          }}
        >
          <div
            style={{ color: "black", textDecoration: "none", display: "flex" }}
          >
          <img src={item.image} width="100" height="150" alt="staff pick img" />
            <div>
              <div>{item.category.title}</div>
              <div>{item.category.description}</div>
            </div>
            <button onClick={()=>{editBtnCall("categoryForms", "editCategoryForm", item)}}>edit</button>
            <button onClick={()=>{deleteStaffPick(item._id)}}>delete</button>
          </div>
        </div>
      );
    });
  } else {
    return (
      <div>
        empty
      </div>
    );
  }
};

export default StaffPickListItem;