import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label} from "reactstrap";

const SchoolForm = (props) => {
  const nameOfComponent = props.school;
  return (<Card>
      <CardHeader>
        <strong>Add New</strong>
      </CardHeader>
      <CardBody>
        <Form onSubmit={(evt) => props.updateElement(evt)}>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="file-input">Image</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="file" id="file-input" name="testimonialImage" onChange={props.addImage}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Link</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="text" id="text-input" onChange={props.onInputChange} value={nameOfComponent.link} name="link"
                     placeholder="link"/>
            </Col>
          </FormGroup> <FormGroup row>
          <Col md="3">
            <Label htmlFor="textarea-input">Description</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="textarea" onChange={props.onInputChange} value={nameOfComponent.description} name="description"
                   id="textarea-input" rows="9"
                   placeholder="description..."/>
          </Col>
        </FormGroup>
        </Form>
      </CardBody>
      <CardFooter>
        <Button onClick={props.updateElement} type="submit" size="sm" color="primary"><i
          className="fa fa-dot-circle-o"></i> Submit</Button>
        <Button onClick={props.cancelEditing} type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
      </CardFooter>
    </Card>
  );
};

export default SchoolForm;
