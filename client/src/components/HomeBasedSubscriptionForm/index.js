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

const HomeBasedSubscriptionForm = (props) => {
  const nameOfComponent = props.subscription;
  return (<Card>
      <CardHeader>
        <strong>Add New</strong>
      </CardHeader>
      <CardBody>
        <Form onSubmit={(evt) => props.updateElement(evt)}>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Title</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="text" id="text-input" onChange={props.onInputChange} value={nameOfComponent.title}
                     name="title" placeholder="title"/>
            </Col>
          </FormGroup><FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input">Link</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="text" id="text-input" onChange={props.onInputChange} value={nameOfComponent.link} name="link"
                   placeholder="link"/>
          </Col>
        </FormGroup><FormGroup row>
          <Col md="3">
            <Label htmlFor="text-input">Amount</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="text" id="text-input" onChange={props.onInputChange} value={nameOfComponent.amount}
                   name="amount" placeholder="amount"/>
          </Col>
        </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label>Tier</Label>
            </Col>
            <Col md="9">
              <FormGroup check inline>
                <Input className="form-check-input" type="radio" id="inline-radio1" onChange={props.onInputChange}
                       name="tier" value="holistic"/>
                <Label className="form-check-label" check htmlFor="inline-radio1">Holistic</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input className="form-check-input" type="radio" id="inline-radio2" onChange={props.onInputChange}
                       name="tier" value="comprehensive"/>
                <Label className="form-check-label" check htmlFor="inline-radio2">Comprehensive</Label>
              </FormGroup>
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

export default HomeBasedSubscriptionForm;
