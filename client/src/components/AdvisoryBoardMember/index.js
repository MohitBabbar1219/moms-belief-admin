import React from "react";

const AdvisoryBoardMember = (props) => {
  const advisoryBoardMember = props.advisoryBoardMember;
  return <div className="w-100 d-flex m-4">
      <div className="w-25">
        {/*<img src={`/${advisoryBoardMember.image}`} className="w-75" alt=""/>*/}
      </div>
      <div className="w-75">
        <p className="font-weight-bold">Name</p>
        <p className="fs-9">{advisoryBoardMember.name}</p>
        <p className="font-weight-bold mt-3">Designation</p>
        <p className="fs-9">{advisoryBoardMember.designation}</p>
        <p className="font-weight-bold mt-3">About</p>
        <p className="fs-9">{advisoryBoardMember.about}</p>
        <button onClick={props.edit} className="btn btn-secondary mt-3 w-25">Edit</button>
      </div>
    </div>;
};

export default AdvisoryBoardMember;