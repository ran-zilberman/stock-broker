import * as React from "react";
import {expect} from 'chai';
import {mount, ReactWrapper} from 'enzyme';
import {StockSearch} from './StockSearch';
import {makeRenderer} from '../../../../test/test-utils'
import {stockSearchDriverFactory} from './StockSearch.driver'

const stockSearchRenderer = makeRenderer(
  StockSearch
);

describe('StockSearch', () => {

  it('should render', () => {
    const wrapper = stockSearchRenderer();
    const driver = stockSearchDriverFactory({wrapper});
    expect(driver.isStockSearchContainerExist()).to.be.true;
  });
});