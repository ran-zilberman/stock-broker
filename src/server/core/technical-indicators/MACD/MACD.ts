import { getFullDate, incrementDay } from './../../utils/date-utils';
import { MACDData, MACDDailyData } from './../../domain/stocks-data';
import { Indicator } from "../Indicator";

export class MACD extends Indicator {

    constructor(private startDate: Date, 
                private data: MACDData) {
        super();
        const generatorFunc = function*(macdData: MACDData) {
            let isIn = false;
            let datePointer = startDate;

            while (datePointer < new Date()) {
                const key = getFullDate(datePointer);
                datePointer = incrementDay(datePointer);
                
                if (macdData[key]) {
                    const dailyMacd: MACDDailyData = macdData[key];
                    isIn = dailyMacd.macd > 0;
                    console.log(`isIn: ${isIn}, date: ${key}`);
                    yield {isIn, date: key};
                } else {
                    continue;
                }
            }
        }

        this.tickGenerator = generatorFunc(this.data);        
    }
}