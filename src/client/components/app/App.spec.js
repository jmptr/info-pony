import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount } from 'enzyme';

import chai from 'chai';

chai.should();

describe('App Component', () => {
  it('should render', () => {
    const component = mount(<App />);
    component.should.not.be.null;
  });
});
