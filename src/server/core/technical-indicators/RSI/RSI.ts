import { RSIData } from '../../domain/stocks-data';
import { Indicator } from "../Indicator";
import { getFullDate, incrementDay } from '../../utils/date-utils';
import { RSISignalProps } from '../../domain/manifest-data';

export class RSI extends Indicator {

    constructor(private startDate: Date, 
                private data: RSIData, 
                private signalProps: RSISignalProps = new RSISignalProps()) {
        super();
        const generatorFunc = function*(signalProps, rsiData, startDate) {
            let isIn = false;
            let datePointer = startDate;

            while (datePointer < new Date()) {
                const key = getFullDate(datePointer);
                datePointer = incrementDay(datePointer);
                
                if (rsiData[key]) {
                    const dailyRsi = rsiData[key];
                    isIn = isIn ? dailyRsi > signalProps.sell : dailyRsi > signalProps.buy;
                    yield {isIn, date: key};
                } else {
                    continue;
                }
            }
        }

        this.tickGenerator = generatorFunc(this.signalProps, this.data, this.startDate);        
    }
}