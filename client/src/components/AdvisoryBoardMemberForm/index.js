import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label} from "reactstrap";

const AdvisoryBoardMemberForm = (props) => {
  const nameOfComponent = props.advisoryBoardMember;
  return (<Card>
      <CardHeader>
        <strong>Add New</strong>
      </CardHeader>
      <CardBody>
        <Form onSubmit={(evt) => props.updateElement(evt)}>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Name</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="text" id="text-input" onChange={props.onInputChange} value={nameOfComponent.name} name="name"
                     placeholder="name"/>
            </Col>
          </FormGroup><FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input">Designation</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="text" id="text-input" onChange={props.onInputChange} value={nameOfComponent.designation}
                   name="designation" placeholder="designation"/>
          </Col>
        </FormGroup> <FormGroup row>
          <Col md="3">
            <Label htmlFor="textarea-input">About</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="textarea" onChange={props.onInputChange} value={nameOfComponent.about} name="about"
                   id="textarea-input" rows="9"
                   placeholder="about..."/>
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

export default AdvisoryBoardMemberForm;
