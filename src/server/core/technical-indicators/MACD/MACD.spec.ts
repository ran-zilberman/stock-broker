import { MACD } from './MACD';
import { MACDData } from './../../domain/stocks-data';
import { expect } from 'chai';
import * as moment from 'moment';
import { RSISignalProps } from '../../domain/manifest-data';

describe('MACD', () => {

    it('should have the first tick set to the start date', ()=> {
        const data: MACDData = {
            '2018-11-19': { histogram: 1, macd: 2, macdSignal: 1},
            '2018-11-20': { histogram: 1, macd: 2, macdSignal: 1},
            '2018-11-21': { histogram: 1, macd: 2, macdSignal: 1}

        };
        const startDate = new Date(2018, 10, 20);
        const macd = new MACD(startDate, data);
        expect(macd.nextValue().value.date).to.equal('2018-11-20');
    });

    it('should have the last tick set to last item in the list', ()=> {
        const data: MACDData = {
            '2018-11-19': { histogram: 1, macd: 2, macdSignal: 1},
            '2018-11-20': { histogram: 1, macd: 2, macdSignal: 1},
            '2018-11-21': { histogram: 1, macd: 2, macdSignal: 1}
        };
        const startDate = new Date(2018, 10, 19);
        const macd = new MACD(startDate, data);
        let tick = null;
        let nextTick = macd.nextValue();

        while (!nextTick.done) {
            tick = nextTick;
            nextTick = macd.nextValue();
        }
        expect(tick.value.date).to.equal('2018-11-21');
    });

    it('should signal buy when moving above centerline', ()=> {
        const data: MACDData = {
            '2018-11-19': { histogram: 1, macd: -1, macdSignal: -2},
            '2018-11-20': { histogram: 1, macd: 0, macdSignal: -1},
            '2018-11-21': { histogram: 1, macd: 1, macdSignal: 0},
            '2018-11-22': { histogram: 1, macd: 2, macdSignal: 1}
        };
        const startDate = new Date(2018, 10, 19);
        const macd = new MACD(startDate, data);
        let tick = null;

        do {
            tick = macd.nextValue()
        } while (!tick.value.isIn)

        expect(tick.value.date).to.equal('2018-11-21');
    });

    it('should signal sell when moving below centerline', ()=> {
        const data: MACDData = {
            '2018-11-19': { histogram: 1, macd: 2, macdSignal: 1},
            '2018-11-20': { histogram: -0.5, macd: 0.5, macdSignal: 1},
            '2018-11-21': { histogram: -0.2, macd: 0, macdSignal: 0.2},
            '2018-11-22': { histogram: -1, macd: -2, macdSignal: -1}
        };
        const startDate = new Date(2018, 10, 19);
        const macd = new MACD(startDate, data);
        let tick = null;

        do {
            tick = macd.nextValue()
        } while (tick.value.isIn)

        expect(tick.value.date).to.equal('2018-11-21');
    });

    it('should jump to the next existing date upon holidays and weekends', ()=> {
        const data: MACDData = {
            '2018-11-19': { histogram: 1, macd: 2, macdSignal: 1},
            '2018-11-24': { histogram: 1, macd: 2, macdSignal: 1},
            '2018-11-25': { histogram: 1, macd: 2, macdSignal: 1}
        };
        const startDate = new Date(2018, 10, 19);
        const rsi = new MACD(startDate, data);
        const [firstTick, secondTick] = [rsi.nextValue(), rsi.nextValue()];

        expect(firstTick.value.date).to.equal('2018-11-19');
        expect(secondTick.value.date).to.equal('2018-11-24');
    });

});