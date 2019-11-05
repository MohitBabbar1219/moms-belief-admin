import React from "react";

const ClinicalConsultant = (props) => {
  const clinicalConsultant = props.clinicalConsultant;
  return <div className="w-100 d-flex m-4">
      <div className="w-25">
        <img src={`/${clinicalConsultant.image}`} className="w-75" alt=""/>
      </div>
      <div className="w-75">
        <p className="font-weight-bold">Name</p>
        <p className="fs-9">{clinicalConsultant.name}</p>
        <p className="font-weight-bold mt-3">Designation</p>
        <p className="fs-9">{clinicalConsultant.designation}</p>
        <p className="font-weight-bold mt-3">About</p>
        <p className="fs-9">{clinicalConsultant.about}</p>
        <button onClick={props.edit} className="btn btn-secondary mt-3 w-25">Edit</button>
      </div>
    </div>;
};

export default ClinicalConsultant;