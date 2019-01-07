import * as React from "react";
import {expect} from 'chai';
import {mount, ReactWrapper} from 'enzyme';
import {App} from './App';

describe('App', () => {

  it('should write hello world', () => {
    const wrapper:ReactWrapper = mount(<App />);
    expect(wrapper.find('.stocksearchContainer')).to.have.lengthOf(1)
  });
});