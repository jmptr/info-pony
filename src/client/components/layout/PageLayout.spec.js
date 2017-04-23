import React from 'react';
import ReactDOM from 'react-dom';
import PageLayout from './PageLayout';
import { shallow } from 'enzyme';

import chai from 'chai';

chai.should();

describe('Page Layout Component ES6', () => {
  it('should render', () => {
    const component = shallow(<PageLayout><span>test</span></PageLayout>);
    component.should.be.defined;
  });
});
