import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryChart, mapStateToProps } from './MemoryChart';
import { mount } from 'enzyme';

import chai from 'chai';

chai.should();

describe('MemoryChart Component', () => {
  it('should render', () => {
    const component = mount(<MemoryChart />);
    component.should.not.be.null;
  });
});
