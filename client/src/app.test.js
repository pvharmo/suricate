// import assert from 'assert';
// // var form = require('../src/components/form/Form.jsx');
//
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1,2,3].indexOf(4), -1);
//     });
//   });
// });

import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import App from '../App';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

describe('App component testing', function() {
  it('renders welcome message', function() {
    const wrapper = mount(<App />);
    const welcome = <AccountCircle/>;
    expect(wrapper.contains(welcome)).to.equal(true);
  });
});
