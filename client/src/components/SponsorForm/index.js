import React from "react";

const SponsorForm = (props) => {
  const sponsor = props.sponsor;
  return <form key={sponsor._id} onSubmit={(evt) => props.updateElement(evt)} className="m-5">
    <div className="w-100 d-flex">
      <div className="w-25">
        <img src={`/${sponsor.image}`} className="w-75" alt=""/>
        <input type="file" name="sponsorImage" className="d-inline-block mt-2 btn" onChange={props.addImage}/>
      </div>
      <div className="w-75">
        <label>Name</label>
        <input className="w-100 form-control" name="name" onChange={props.onInputChange} value={sponsor.name}/>
        <br/>
        <button onClick={props.updateElement} className="btn btn-success mt-3 w-25">Update</button>
        <button onClick={props.cancelEditing} className="btn btn-danger mt-3 ml-3 w-25">Cancel</button>
      </div>
    </div>
  </form>;
};

export default SponsorForm;