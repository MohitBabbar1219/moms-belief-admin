import React from "react";

const ClinicalExpert = (props) => {
  const clinicalExpert = props.clinicalExpert;
  return <div className="w-100 d-flex m-4">
      <div className="w-25">
        <img src={`/${clinicalExpert.image}`} className="w-75" alt=""/>
      </div>
      <div className="w-75">
        <p className="font-weight-bold">Name</p>
        <p className="fs-9">{clinicalExpert.name}</p>
        <p className="font-weight-bold mt-3">Designation</p>
        <p className="fs-9">{clinicalExpert.designation}</p>
        <p className="font-weight-bold mt-3">Link</p>
        <p className="fs-9">{clinicalExpert.link}</p>
        <p className="font-weight-bold mt-3">About</p>
        <p className="fs-9">{clinicalExpert.about}</p>
        <button onClick={props.edit} className="btn btn-secondary mt-3 w-25">Edit</button>
      </div>
    </div>;
};

export default ClinicalExpert;