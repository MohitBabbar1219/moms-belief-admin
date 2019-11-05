import React from "react";

const TestimonialForm = (props) => {
  const testimonial = props.testimonial;
  return <form key={testimonial._id} onSubmit={(evt) => props.updateElement(evt)} className="m-5">
    <div className="w-100 d-flex">
      <div className="w-25">
        <img src={`/${testimonial.image}`} className="w-75" alt=""/>
        <input type="file" name="testimonialImage" className="d-inline-block mt-2 btn" onChange={props.addImage}/>
      </div>
      <div className="w-75">
        <label>Content</label>
        <textarea className="w-100 form-control" name="content" rows="5" onChange={props.onInputChange} value={testimonial.content}/> <br/>
        <label>Author</label>
        <input className="w-100 form-control" name="author" onChange={props.onInputChange} value={testimonial.author}/>
        <button onClick={props.updateElement} className="btn btn-success mt-3 w-25">Update</button>
        <button onClick={props.cancelEditing} className="btn btn-danger mt-3 ml-3 w-25">Cancel</button>
      </div>
    </div>
  </form>;
};

export default TestimonialForm;