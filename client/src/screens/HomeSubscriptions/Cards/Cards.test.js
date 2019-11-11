import React from 'react';
import ReactDOM from 'react-dom';
import TestimonialCards from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TestimonialCards/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
