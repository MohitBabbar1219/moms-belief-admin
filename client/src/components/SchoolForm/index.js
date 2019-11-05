import React from "react";
import {Form} from 'react-bootstrap';

const SchoolForm = (props) => {
  const school = props.school;
  return <form key={school._id} onSubmit={(evt) => props.updateElement(evt)} className="m-5">
    <div className="w-100 d-flex">
      <div className="w-25">
        <img src={`/${school.image}`} className="w-75" alt=""/>
        <input type="file" name="newsImage" className="d-inline-block mt-2 btn" onChange={props.addImage}/>
      </div>
      <div className="w-75">
        <label>Description</label>
        <input className="w-100 form-control" name="description" onChange={props.onInputChange} value={school.description}/>
        <label>Link</label>
        <input className="w-100 form-control" name="link" onChange={props.onInputChange} value={school.link}/>
        <button onClick={props.updateElement} className="btn btn-success mt-3 w-25">Update</button>
        <button onClick={props.cancelEditing} className="btn btn-danger mt-3 ml-3 w-25">Cancel</button>
      </div>
    </div>
  </form>;
};

export default SchoolForm;