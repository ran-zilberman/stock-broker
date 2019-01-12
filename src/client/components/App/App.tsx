import * as React from 'react';
import * as s from  './App.scss';
import { StockSearch } from "../StockSearch";
/* eslint-disable */
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import MomentUtils from '@date-io/moment';

export class App extends React.Component<{}> {

  handleDateChange = (date:Date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils} >
          <div className={s.appContainer}>
            <StockSearch></StockSearch>
          </div>
        </MuiPickersUtilsProvider>
      );
  }
}
