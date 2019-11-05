import React from "react";

const ProgramAssistanceForm = (props) => {
  const programAssistance = props.programAssistance;
  return <form key={programAssistance._id} onSubmit={(evt) => props.updateElement(evt)} className="m-5">
    <div className="w-100 d-flex">
      <div className="w-25">
        <img src={`/${programAssistance.image}`} className="w-75" alt=""/>
        <input type="file" name="newsImage" className="d-inline-block mt-2 btn" onChange={props.addImage}/>
      </div>
      <div className="w-75">
        <label>Description</label>
        <textarea className="w-100 form-control" name="description" rows="2" onChange={props.onInputChange} value={programAssistance.description}/> <br/>
        <label>Amount</label>
        <input className="w-100 form-control" name="amount" onChange={props.onInputChange} value={programAssistance.amount}/>
        <button onClick={props.updateElement} className="btn btn-success mt-3 w-25">Update</button>
        <button onClick={props.cancelEditing} className="btn btn-danger mt-3 ml-3 w-25">Cancel</button>
      </div>
    </div>
  </form>;
};

export default ProgramAssistanceForm;