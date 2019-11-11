import {Button, Col} from "reactstrap";
import React from "react";

const ButtonWithIcon = (props) => {
  return (<Col sm xs="12" className="text-center mt-3">
    <Button color="primary">
      <i className={`fa fa-${props.icon}-o`}></i>&nbsp;{props.value}
    </Button>
  </Col>);
};

export default ButtonWithIcon;
