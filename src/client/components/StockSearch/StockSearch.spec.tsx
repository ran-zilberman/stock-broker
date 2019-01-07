import * as React from "react";
import {expect} from 'chai';
import {mount, ReactWrapper} from 'enzyme';
import {StockSearch} from './StockSearch';

describe('StockSearch', () => {

  it('should write hello world', () => {
    let wrapper:ReactWrapper = mount(<StockSearch />);
    console.log(wrapper.debug());
    expect(wrapper.find('.stocksearch-container')).to.have.lengthOf(1)
  });
});