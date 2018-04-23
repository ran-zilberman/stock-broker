import * as React from "react";
import {expect} from 'chai';
import {mount, ReactWrapper} from 'enzyme';
import {App} from './App';

describe('some suite', () => {

  it('should write hello world', () => {
    let comp:ReactWrapper = mount(<App />);
    expect(comp.text()).to.equal('Hello World');
  });
});