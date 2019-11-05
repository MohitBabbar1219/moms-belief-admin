import React from "react";

const MediaMentionForm = (props) => {
  const mediaMention = props.mediaMention;
  return <form key={mediaMention._id} onSubmit={(evt) => props.updateElement(evt)} className="m-5">
    <div className="w-100 d-flex">
      <div className="w-25">
        <img src={`/${mediaMention.image}`} className="w-75" alt=""/>
        <input type="file" name="mediaMentionImage" className="d-inline-block mt-2 btn" onChange={props.addImage}/>
      </div>
      <div className="w-75">
        <label>text</label>
        <textarea
          className="w-100 form-control"
          name="text"
          rows="3"
          onChange={props.onInputChange}
          value={mediaMention.text}/> <br/>
        <button onClick={props.updateElement} className="btn btn-success mt-3 w-25">Update</button>
        <button onClick={props.cancelEditing} className="btn btn-danger mt-3 ml-3 w-25">Cancel</button>
      </div>
    </div>
  </form>;
};

export default MediaMentionForm;