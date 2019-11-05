import React from "react";

const Testimonial = (props) => {
  const testimonial = props.testimonial;
  return <div className="w-100 d-flex m-4">
      <div className="w-25">
        <img src={`/${testimonial.image}`} className="w-75" alt=""/>
      </div>
      <div className="w-75">
        <p className="font-weight-bold">Content</p>
        <p className="fs-9">{testimonial.content}</p>
        <p className="font-weight-bold mt-3">Author</p>
        <p className="fs-9">{testimonial.author}</p>
        <button onClick={props.edit} className="btn btn-secondary mt-3 w-25">Edit</button>
      </div>
    </div>;
};

export default Testimonial;