import React from "react";

const CityCenterCount = (props) => {
  const cityCenterCount = props.cityCenterCount;
  return <div className="w-100 d-flex m-4">
      <div className="w-25">
        {/*<img src={`/${cityCenterCount.image}`} className="w-75" alt=""/>*/}
      </div>
      <div className="w-75">
        <p className="font-weight-bold">City</p>
        <p className="fs-9">{cityCenterCount.city}</p>
        <p className="font-weight-bold mt-3">Count</p>
        <p className="fs-9">{cityCenterCount.count}</p>
        <button onClick={props.edit} className="btn btn-secondary mt-3 w-25">Edit</button>
      </div>
    </div>;
};

export default CityCenterCount;