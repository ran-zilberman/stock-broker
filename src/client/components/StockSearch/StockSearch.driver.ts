import {makeDriverFactory} from '../../../../test/test-utils';

export const stockSearchDriverFactory = makeDriverFactory(component => {
    return {
      getStockSearchContainer() {
        return component.find('[data-hook="stock-search"]');
      },
      isStockSearchContainerExist() {
        return this.getStockSearchContainer().length==1;
      }
    };
  });