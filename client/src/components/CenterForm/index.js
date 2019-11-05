import React from "react";

const CenterForm = (props) => {
  const center = props.center;
  return <form key={center._id} onSubmit={(evt) => props.updateElement(evt)} className="m-5">
    <div className="w-100 d-flex">
      <div className="w-25">
        <div>
          <img src={`/${center.thumbImage}`} className="w-75" alt=""/>
          <input type="file" name="newsImage" className="d-inline-block mt-2 btn" onChange={props.addImage}/>
        </div>
        <div>
          <img src={`/${center.images[0]}`} className="w-75" alt=""/>
          <input type="file" name="newsImage" className="d-inline-block mt-2 btn" onChange={props.addImage}/>
        </div>
        <div>
          <img src={`/${center.images[1]}`} className="w-75" alt=""/>
          <input type="file" name="newsImage" className="d-inline-block mt-2 btn" onChange={props.addImage}/>
        </div>
        <div>
          <img src={`/${center.images[2]}`} className="w-75" alt=""/>
          <input type="file" name="newsImage" className="d-inline-block mt-2 btn" onChange={props.addImage}/>
        </div>
      </div>
      <div className="w-75">
        <label>Name</label>
        <input className="w-100 form-control" name="name" onChange={props.onInputChange} value={center.name}/>
        <label>Designation</label>
        <input className="w-100 form-control" name="designation" onChange={props.onInputChange} value={center.designation}/>
        <label>About</label>
        <textarea className="w-100 form-control" name="about" rows="2" onChange={props.onInputChange} value={center.about}/> <br/>
        <button onClick={props.updateElement} className="btn btn-success mt-3 w-25">Update</button>
        <button onClick={props.cancelEditing} className="btn btn-danger mt-3 ml-3 w-25">Cancel</button>
      </div>
    </div>
  </form>;
};

export default CenterForm;