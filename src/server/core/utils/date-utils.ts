import * as moment from 'moment';


export const getFullDate = (date: Date) => moment(date).format('YYYY-MM-DD');

export const incrementDay = (date: Date)=> {
    return new Date(date.setDate(date.getDate() + 1));
}
