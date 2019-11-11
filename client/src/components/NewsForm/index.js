import React from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label
} from "reactstrap";

const NewsForm = (props) => {
  const news = props.news;
  return (<Card>
      <CardHeader>
        <strong>Add New</strong>
      </CardHeader>
      <CardBody>
        <Form onSubmit={(evt) => props.updateElement(evt)}>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="textarea-input">Title</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="textarea" onChange={props.onInputChange} value={news.title} name="title" id="textarea-input" rows="2"
                     placeholder="Content..."/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Link</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="text" id="text-input" onChange={props.onInputChange} value={news.link} name="link" placeholder="link"/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Date</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="text" id="text-input" onChange={props.onInputChange} value={news.date} name="date" placeholder="date"/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="file-input">Image</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="file" id="file-input" name="newsImage" onChange={props.addImage}/>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
      <CardFooter>
        <Button onClick={props.updateElement} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
        <Button onClick={props.cancelEditing} type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
      </CardFooter>
    </Card>
  );
};

export default NewsForm;
