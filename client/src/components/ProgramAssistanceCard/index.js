import React from 'react';
import {Card, CardBody, CardHeader, Col} from "reactstrap";

const ProgramAssistanceCard = (props) => {
  const clinicalExpert = props.programAssistance;
  return (<Col xs="12" sm="6" md="6">
    <Card>
      <CardHeader>Clinical Expert</CardHeader>
      <CardBody className="d-flex">
        <div className="w-40 pr-4">
          <img src={`/${clinicalExpert.image}`} className="w-100" alt=""/>
        </div>
        <div className="w-75">
          <p className="font-weight-bold">Amount</p>
          <p className="fs-9">{clinicalExpert.amount}</p>
          <p className="font-weight-bold">Description</p>
          <p className="fs-9">{clinicalExpert.description}</p>
          <button onClick={props.edit} className="btn btn-secondary mt-3 w-25">Edit</button>
          <button onClick={props.delete} className="btn btn-danger ml-3 mt-3 w-25">Delete</button>
        </div>
      </CardBody>
    </Card>
  </Col>);
};

export default ProgramAssistanceCard;
