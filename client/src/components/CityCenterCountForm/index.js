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

const CityCenterCountForm = (props) => {
  const nameOfComponent = props.cityCenterCount;
  return (<Card>
      <CardHeader>
        <strong>Add New</strong>
      </CardHeader>
      <CardBody>
        <Form onSubmit={(evt) => props.updateElement(evt)}>
<FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">City</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="text" id="text-input" onChange={props.onInputChange} value={nameOfComponent.city} name="city" placeholder="city"/>
            </Col>
          </FormGroup><FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Count</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="text" id="text-input" onChange={props.onInputChange} value={nameOfComponent.count} name="count" placeholder="count"/>
            </Col>
          </FormGroup>        </Form>
      </CardBody>
      <CardFooter>
        <Button onClick={props.updateElement} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
        <Button onClick={props.cancelEditing} type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
      </CardFooter>
    </Card>
  );
};

export default CityCenterCountForm;
