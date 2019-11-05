import React from "react";

const Center = (props) => {
  const center = props.center;
  return <div className="w-25 p-2 bg-light m-2">
    <div>
      <img src={`/${center.thumbImage}`} className="w-100" alt=""/>
    </div>
    <h3>{center.title}</h3>
    <h5>{center.doctor}</h5>
    <button onClick={props.edit} className="btn btn-secondary mt-2 w-25">Edit</button>
    <button onClick={props.delete} className="btn btn-danger mt-2 ml-3 w-25">Delete</button>
  </div>;
};

export default Center;