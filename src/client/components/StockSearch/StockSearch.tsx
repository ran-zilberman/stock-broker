import * as React from 'react';
import * as s from  './StockSearch.scss';
import DatePicker from 'material-ui-pickers/DatePicker';
import TextField from '@material-ui/core/TextField';

enum FormFields {
  START_DATE = 'startDate',
  END_DATE = 'endDate',
  STOCK_SYMBOL = 'stockSymbol'
}


export class StockSearch extends React.Component<{}> {

  state = {
    startDate: new Date(),
    endDate: new Date(),
    startDateValid: true,
    endDateValid: true,
    formErrors: {
      [FormFields.START_DATE]: null,
      [FormFields.END_DATE]: null,
    },
    formValidity: {
      [FormFields.START_DATE]: false,
      [FormFields.END_DATE]: false,
    },
    touched: {
      [FormFields.START_DATE]: false,
      [FormFields.END_DATE]: false,
    },
    stockSymbol: ''
  };

  handleChange = (name:string) => (value) => {
    this.setState({ [name]: value }, ()=> this.validateForm());
  };

  validateForm = () => {
    Object.values(FormFields).map(fieldName => this.validateField(fieldName));
  }

  validateField = (fieldName)=> {
    const {startDate, endDate} = this.state;
    let {formValidity, formErrors} = this.state;
    switch(fieldName) {
      case FormFields.START_DATE:
        formValidity[FormFields.START_DATE] = startDate < endDate;
        formErrors[FormFields.START_DATE] = formValidity[FormFields.END_DATE] ? '': 'start date should be sooner than end date';
        break
      case FormFields.END_DATE:
        formValidity[FormFields.END_DATE] = startDate < endDate;
        formErrors[FormFields.END_DATE] = formValidity[FormFields.END_DATE] ? '': 'end date should be later than start date';
        break
      case FormFields.STOCK_SYMBOL:
        formValidity[FormFields.STOCK_SYMBOL] = false;
        formErrors[FormFields.STOCK_SYMBOL] = '';
        break
      default:
        break  
    }

    this.setState({formErrors, formValidity});
  }

  showInvalid = (field: FormFields) => {
    const {formValidity, touched} = this.state;
    return touched[field] && !formValidity[field];
  }

  onBlur = (field: FormFields) => () => {
    console.log('blur:' + field );
    let {touched} = this.state;
    touched[field] = true;
    this.setState({touched});
  }


  render() {
    const { startDate, endDate } = this.state;
    return <div data-hook="stock-search" className={s.stocksearch}>
              <TextField
                    label="Symbol"
                    onKeyDown={this.handleChange(FormFields.STOCK_SYMBOL)} 
                    onBlur={this.onBlur(FormFields.STOCK_SYMBOL)}
                    error = {this.showInvalid(FormFields.STOCK_SYMBOL)}
                    className={s.queryField} />
              <div className={s.spacer} />
              <DatePicker className={s.queryField} label="Period Start Date" 
                          value={startDate} 
                          onChange={this.handleChange(FormFields.START_DATE)}
                          onClose={this.onBlur(FormFields.START_DATE)}
                          error = {this.showInvalid(FormFields.START_DATE)}
                          animateYearScrolling />
              <div className={s.spacer} />
              <DatePicker className={s.queryField} label="Period End Date" 
                          value={endDate} 
                          error = {this.showInvalid(FormFields.END_DATE)}
                          onChange={this.handleChange(FormFields.END_DATE)}
                          onClose={this.onBlur(FormFields.END_DATE)}
                          animateYearScrolling />
    </div>;
  }
}
