import React from 'react';
import {Card, CardBody, CardHeader, Col} from "reactstrap";

const CenterCard = (props) => {
  const news = props.center;
  return (<Col xs="12" sm="6" md="6">
    <Card>
      <CardHeader>Center</CardHeader>
      <CardBody className="d-flex">
        <div className="w-40 pr-4">
          <img src={`/${news.thumbImage}`} className="w-100" alt=""/>
        </div>
        <div className="w-75">
          <p className="font-weight-bold">Title</p>
          <p className="fs-9">{news.title}</p>
          <p className="font-weight-bold mt-3">Link</p>
          <p className="fs-9">{news.doctor}</p>
          <p className="font-weight-bold mt-3">Date</p>
          <p className="fs-9">{news.aboutCenter}</p>
          <button onClick={props.edit} className="btn btn-secondary mt-3 w-25">Edit</button>
          <button onClick={props.delete} className="btn btn-danger ml-3 mt-3 w-25">Delete</button>
        </div>
      </CardBody>
    </Card>
  </Col>);
};

export default CenterCard;
