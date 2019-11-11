import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Col} from "reactstrap";

const SchoolCard = (props) => {
  const clinicalExpert = props.school;
  return (<Col xs="12" sm="6" md="6">
    <Card>
      <CardHeader>Clinical Expert</CardHeader>
      <CardBody className="d-flex">
        <div className="w-40 pr-4">
          <img src={`/${clinicalExpert.image}`} className="w-100" alt=""/>
        </div>
        <div className="w-75">
          <p className="font-weight-bold">Link</p>
          <p className="fs-9">{clinicalExpert.link}</p>
          <p className="font-weight-bold">Description</p>
          <p className="fs-9">{clinicalExpert.description}</p>
          <button onClick={props.edit} className="btn btn-secondary mt-3 w-25">Edit</button>
          <button onClick={props.delete} className="btn btn-danger ml-3 mt-3 w-25">Delete</button>
        </div>
      </CardBody>
    </Card>
  </Col>);
};

export default SchoolCard;
