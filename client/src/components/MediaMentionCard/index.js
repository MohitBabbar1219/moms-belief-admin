import React from 'react';
import {Card, CardBody, CardHeader, Col} from "reactstrap";

const MediaMentionCard = (props) => {
  const mediaMention = props.mediaMention;
  return (<Col xs="12" sm="6" md="6">
    <Card>
      <CardHeader>News</CardHeader>
      <CardBody className="d-flex">
        <div className="w-40 pr-4">
          <img src={`/${mediaMention.image}`} className="w-100" alt=""/>
        </div>
        <div className="w-75">
          <p className="font-weight-bold">Text</p>
          <p className="fs-9">{mediaMention.text}</p>
          <button onClick={props.edit} className="btn btn-secondary mt-3 w-25">Edit</button>
          <button onClick={props.delete} className="btn btn-danger ml-3 mt-3 w-25">Delete</button>
        </div>
      </CardBody>
    </Card>
  </Col>);
};

export default MediaMentionCard;
