import React from "react";
import "../CSS/productsListItem.css";
import deleteBtn from "../assests/icons/delete-button.png";

const DepartmentsListItem = ({
  departments,
  editBtnCall,
  deleteDepartment,
  currentUser
}) => {
  if (departments.length > 0) {
    return departments.map((department, i) => {
      return (
        <div key={i} className="col-sm-4">
          <div
            style={{
              border: "1px solid whitesmoke",
              padding: 5,
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div>
              <div>{department.title}</div>
              <div>{department.description}</div>
            </div>
            <div style={{ display: "flex" }}>
              <img
                src={deleteBtn}
                alt="delete button"
                width="30"
                height="30"
                onClick={() => {
                  deleteDepartment(currentUser.user.id, department._id);
                }}
              />
              <button
                className="btn"
                onClick={() => {
                  editBtnCall(
                    "departmentForms",
                    "editDepartmentForm",
                    department
                  );
                }}
              >
                edit
              </button>
            </div>
          </div>
        </div>
      );
    });
  } else {
    return <div>empty</div>;
  }
};

export default DepartmentsListItem;
