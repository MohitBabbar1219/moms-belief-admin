import React from "react";

const School = (props) => {
  const school = props.school;
  return <div className="w-100 d-flex m-4">
      <div className="w-25">
        <img src={`/${school.image}`} className="w-75" alt=""/>
      </div>
      <div className="w-75">
        <p className="font-weight-bold">Description</p>
        <p className="fs-9">{school.description}</p>
        <p className="font-weight-bold mt-3">Link</p>
        <p className="fs-9">{school.link}</p>
        <button onClick={props.edit} className="btn btn-secondary mt-3 w-25">Edit</button>
      </div>
    </div>;
};

export default School;