import React from "react";

const AdvisoryBoardMemberForm = (props) => {
  const advisoryBoardMember = props.advisoryBoardMember;
  return <form key={advisoryBoardMember._id} onSubmit={(evt) => props.updateElement(evt)} className="m-5">
    <div className="w-100 d-flex">
      <div className="w-25">
        {/*<img src={`/${advisoryBoardMember.image}`} className="w-75" alt=""/>*/}
        {/*<input type="file" name="newsImage" className="d-inline-block mt-2 btn" onChange={props.addImage}/>*/}
      </div>
      <div className="w-75">
        <label>Name</label>
        <input className="w-100 form-control" name="name" onChange={props.onInputChange} value={advisoryBoardMember.name}/>
        <label>Designation</label>
        <input className="w-100 form-control" name="designation" onChange={props.onInputChange} value={advisoryBoardMember.designation}/>
        <label>About</label>
        <textarea className="w-100 form-control" name="about" rows="2" onChange={props.onInputChange} value={advisoryBoardMember.about}/> <br/>
        <button onClick={props.updateElement} className="btn btn-success mt-3 w-25">Update</button>
        <button onClick={props.cancelEditing} className="btn btn-danger mt-3 ml-3 w-25">Cancel</button>
      </div>
    </div>
  </form>;
};

export default AdvisoryBoardMemberForm;