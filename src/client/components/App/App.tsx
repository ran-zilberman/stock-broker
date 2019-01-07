import * as React from 'react';
import * as s from  './App.scss';
import { StockSearch } from "../StockSearch";

export class App extends React.Component<{}> {
  render() {
    return (<div>
      <h1 className={s.header}>Hello World</h1>
      <StockSearch></StockSearch>
    </div>);
  }
}
