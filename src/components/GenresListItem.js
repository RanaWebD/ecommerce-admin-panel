import React from "react";
import "../CSS/productsListItem.css";
import deleteBtn from "../assests/icons/delete-button.png";

const GenresListItem = props => {
  let { genres, editBtnCall, currentUser, dGenre, deleteGenre } = props;
  console.log("dg", props);
  if (genres.length > 0) {
    return genres.map((genre, i) => {
      return (
        <div className="col-sm-4" key={i}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid whitesmoke",
              padding: 5
            }}
          >
            <div>
              <div>{genre.title}</div>
              <div>{genre.description}</div>
            </div>
            <div style={{ display: "flex" }}>
              <button
                onClick={() => {
                  editBtnCall("genreForms", "editGenreForm", genre);
                }}
              >
                edit
              </button>
              <button
                onClick={() => {
                  dGenre(currentUser.user.id, genre._id);
                  // deleteGenre(currentUser.user.id, genre);
                }}
              >
                <img
                  src={deleteBtn}
                  alt="delete button"
                  width="30"
                  height="30"
                />
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

export default GenresListItem;
