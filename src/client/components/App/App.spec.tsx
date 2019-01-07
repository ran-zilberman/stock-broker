import * as React from "react";
import {expect} from 'chai';
import {mount, ReactWrapper} from 'enzyme';
import {App} from './App';

describe('App', () => {

  it('should write hello world', () => {
    let comp:ReactWrapper = mount(<App />);
    expect(comp).to.exist;
  });
});