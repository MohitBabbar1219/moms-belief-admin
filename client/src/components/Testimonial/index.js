import React from 'react';
import {Card, CardBody, CardHeader, Col} from "reactstrap";

const Testimonial = (props) => {
  const testimonial = props.testimonial;
  return (<Col xs="12" sm="6" md="6">
    <Card>
      <CardHeader>Testimonial</CardHeader>
      <CardBody className="d-flex">
        <div className="w-40 pr-4">
          <img src={`/${testimonial.image}`} className="w-100" alt=""/>
        </div>
        <div className="w-75">
          <p className="font-weight-bold">Content</p>
          <p className="fs-9">{testimonial.content}</p>
          <p className="font-weight-bold mt-3">Author</p>
          <p className="fs-9">{testimonial.author}</p>
          <button onClick={props.edit} className="btn btn-secondary mt-3 w-25">Edit</button>
          <button onClick={props.delete} className="btn btn-danger ml-3 mt-3 w-25">Delete</button>
        </div>
      </CardBody>
    </Card>
  </Col>);
};

export default Testimonial;
