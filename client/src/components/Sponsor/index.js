import React from "react";

const Sponsor = (props) => {
  const sponsor = props.sponsor;
  return <div className="w-100 d-flex m-4">
      <div className="w-25">
        <img src={`/${sponsor.image}`} className="w-75" alt=""/>
      </div>
      <div className="w-75">
        <p className="font-weight-bold">Name</p>
        <p className="fs-9">{sponsor.name}</p>
        <button onClick={props.edit} className="btn btn-secondary mt-3 w-25">Edit</button>
      </div>
    </div>;
};

export default Sponsor;