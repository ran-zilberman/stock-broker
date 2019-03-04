import { expect } from 'chai';
import { RSI } from './RSI';
import * as moment from 'moment';
import { RSISignalProps } from '../../domain/manifest-data';

describe('RSI', () => {

    it('should have the first tick set to the start date', ()=> {
        const data = {'2018-11-19': 40, '2018-11-20': 46, '2018-11-21': 52};
        const startDate = new Date(2018, 10, 20);
        const rsi = new RSI(startDate, data);
        expect(rsi.nextValue().value.date).to.equal('2018-11-20');
    });

    it('should have the last tick set to last item in the list', ()=> {
        const data = {'2018-11-19': 40, '2018-11-20': 46, '2018-11-21': 52};
        const startDate = new Date(2018, 10, 21);
        const rsi = new RSI(startDate, data);
        let tick = null;
        let nextTick = rsi.nextValue();

        while (!nextTick.done) {
            tick = nextTick;
            nextTick = rsi.nextValue();
        }
        expect(tick.value.date).to.equal('2018-11-21');
    });

    it('should signal buy when moving above 50 by default', ()=> {
        const data = {'2018-11-19': 40, '2018-11-20': 46, '2018-11-21': 52, '2018-11-22': 56};
        const startDate = new Date(2018, 10, 19);
        const rsi = new RSI(startDate, data);
        let tick = null;

        do {
            tick = rsi.nextValue()
        } while (!tick.value.isIn)

        expect(tick.value.date).to.equal('2018-11-21');
    });

    it('should signal sell when moving below 50 by default', ()=> {
        const data = {'2018-11-19': 60, '2018-11-20': 46, '2018-11-21': 40};
        const startDate = new Date(2018, 10, 19);
        const rsi = new RSI(startDate, data);
        let tick = null;

        do {
            tick = rsi.nextValue()
        } while (tick.value.isIn)

        expect(tick.value.date).to.equal('2018-11-20');
    });

    it('should signal buy when moving above the buy threshold passed as a parameter', ()=> {
        const data = {'2018-11-19': 40, '2018-11-20': 46, '2018-11-21': 70, '2018-11-22': 76};
        const startDate = new Date(2018, 10, 19);
        const rsi = new RSI(startDate, data, new RSISignalProps(60));
        let tick = null;

        do {
            tick = rsi.nextValue()
        } while (!tick.value.isIn)

        expect(tick.value.date).to.equal('2018-11-21');
    });

    it('should signal sell when moving below the sell threshold passed as a parameter', ()=> {
        const data = {'2018-11-19': 70, '2018-11-20': 46, '2018-11-21': 39, '2018-11-22': 30};
        const startDate = new Date(2018, 10, 19);
        const rsi = new RSI(startDate, data, new RSISignalProps(60, 40));
        let tick = null;

        do {
            tick = rsi.nextValue()
        } while (tick.value.isIn)

        expect(tick.value.date).to.equal('2018-11-21');

    });

    it('should jump to the next existing date upon holidays and weekends', ()=> {
        const data = {'2018-11-19': 70, '2018-11-23': 46};
        const startDate = new Date(2018, 10, 19);
        const rsi = new RSI(startDate, data);
        const [firstTick, secondTick] = [rsi.nextValue(), rsi.nextValue()];

        expect(firstTick.value.date).to.equal('2018-11-19');
        expect(secondTick.value.date).to.equal('2018-11-23');
    });

});