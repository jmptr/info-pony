import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Text from 'material-ui/Text';
import AppHeader from './AppHeader';
import { mount } from 'enzyme';

import chai from 'chai';

chai.should();

describe('App Header Component', () => {
  it('should render the title', () => {
    const expected = 'Example Title';
    const component = mount(<MuiThemeProvider><AppHeader title={expected} /></MuiThemeProvider>);
    const title = component.find(Text)
    title.text().should.equal(expected);
  });
});
