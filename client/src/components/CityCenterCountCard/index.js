import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Col} from "reactstrap";

const CityCenterCountCard = (props) => {
  const clinicalConsultant = props.cityCenterCount;
  return (<Col xs="12" sm="6" md="6">
    <Card>
      <CardHeader>City Center Count</CardHeader>
      <CardBody className="d-flex">
        <div className="w-40 pr-4">
          {/*<img src={`/${clinicalConsultant.image}`} className="w-100" alt=""/>*/}
        </div>
        <div className="w-75">
          <p className="font-weight-bold">City</p>
          <p className="fs-9">{clinicalConsultant.city}</p>
          <p className="font-weight-bold">Count</p>
          <p className="fs-9">{clinicalConsultant.count}</p>
          <button onClick={props.edit} className="btn btn-secondary mt-3 w-25">Edit</button>
          <button onClick={props.delete} className="btn btn-danger ml-3 mt-3 w-25">Delete</button>
        </div>
      </CardBody>
    </Card>
  </Col>);
};

export default CityCenterCountCard;
