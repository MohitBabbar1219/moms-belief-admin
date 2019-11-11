import React from 'react';
import isAuthenticated from "../../utils/authStatus";
import {Redirect, Route} from "react-router-dom";

const SomeRouter = (props) => isAuthenticated() || props.allow ? <Route {...props}  /> : <Redirect to='/login'/>;

export default SomeRouter;
