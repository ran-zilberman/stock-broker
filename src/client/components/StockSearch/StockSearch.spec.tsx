import * as React from "react";
import {expect} from 'chai';
import {mount, ReactWrapper} from 'enzyme';
import {StockSearch} from './StockSearch';

describe('StockSearch', () => {

  it('should render', () => {
    const wrapper:ReactWrapper = mount(<StockSearch />);
    expect(wrapper.find('.stocksearchContainer')).to.have.lengthOf(1)
  });
});