import { TimeSeries } from '../../domain/stocks-data';
import { Indicator } from "../Indicator";
import { getFullDate, incrementDay } from '../../utils/date-utils';
import { RSISignalProps } from '../../domain/manifest-data';

export class SMACross extends Indicator {

    constructor(private startDate: Date, 
                private longPeriodMA: TimeSeries<number>, 
                private shortPeriodMA: TimeSeries<number>) {
        super();
        const generatorFunc = function*(longPeriodMA, shortPeriodMA, startDate) {
            let isIn = false;
            let datePointer = startDate;

            while (datePointer < new Date()) {
                const key = getFullDate(datePointer);
                datePointer = incrementDay(datePointer);
                
                if (longPeriodMA[key] && shortPeriodMA[key]) {
                    const dailyLongMA = longPeriodMA[key];
                    const dailyshortMA = shortPeriodMA[key];
                    isIn = isIn ? dailyshortMA < dailyLongMA : dailyshortMA > dailyLongMA;
                    yield {isIn, date: key};
                } else {
                    continue;
                }
            }
        }

        this.tickGenerator = generatorFunc(this.longPeriodMA, this.shortPeriodMA, this.startDate);        
    }
}