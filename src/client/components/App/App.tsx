import * as React from 'react';
import * as s from  './App.scss';
import { StockSearch } from "../StockSearch";

export class App extends React.Component<{}> {
  render() {
    return (<div className={s.appContainer}>
      <StockSearch></StockSearch>
    </div>);
  }
}
