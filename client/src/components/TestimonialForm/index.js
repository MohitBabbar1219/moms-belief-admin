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

const TestimonialForm = (props) => {
  const testimonial = props.testimonial;
  return (<Card>
      <CardHeader>
        <strong>Add New</strong>
      </CardHeader>
      <CardBody>
        <Form onSubmit={(evt) => props.updateElement(evt)}>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="textarea-input">Content</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="textarea" onChange={props.onInputChange} value={testimonial.content} name="content" id="textarea-input" rows="9"
                     placeholder="Content..."/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Author</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="text" id="text-input" onChange={props.onInputChange} value={testimonial.author} name="author" placeholder="Author"/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="file-input">Image</Label>
            </Col>
            <Col xs="12" md="9">
              <Input type="file" id="file-input" name="testimonialImage" onChange={props.addImage}/>
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

export default TestimonialForm;
