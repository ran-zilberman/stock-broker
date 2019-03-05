import { SMACross } from './SMACross';
import { RSI } from '../RSI';
import { expect } from 'chai';

describe('SMACross', () => {

    it('should have the first tick set to the start date', ()=> {
        const longPeriodData = {'2018-11-19': 40, '2018-11-20': 46, '2018-11-21': 52};
        const shortPeriodData = {'2018-11-19': 40, '2018-11-20': 46, '2018-11-21': 52};
        const startDate = new Date(2018, 10, 20);
        const smaCross = new SMACross(startDate, longPeriodData, shortPeriodData);
        expect(smaCross.nextValue().value.date).to.equal('2018-11-20');
    });

    it('should have the last tick set to last item in the list', ()=> {
        const longPeriodData = {'2018-11-19': 40, '2018-11-20': 46, '2018-11-21': 52};
        const shortPeriodData = {'2018-11-19': 40, '2018-11-20': 46, '2018-11-21': 52};
        const startDate = new Date(2018, 10, 21);
        const smaCross = new SMACross(startDate, longPeriodData, shortPeriodData);
        let tick = null;
        let nextTick = smaCross.nextValue();

        while (!nextTick.done) {
            tick = nextTick;
            nextTick = smaCross.nextValue();
        }
        expect(tick.value.date).to.equal('2018-11-21');
    });

    it('should signal buy when short period moving average crosses longer period moving average upward', ()=> {
        const longPeriodData = {'2018-11-19': 40, '2018-11-20': 46, '2018-11-21': 52};
        const shortPeriodData = {'2018-11-19': 40, '2018-11-20': 56, '2018-11-21': 67};
        const startDate = new Date(2018, 10, 20);
        const smaCross = new SMACross(startDate, longPeriodData, shortPeriodData);
        let tick = null;

        do {
            tick = smaCross.nextValue()
        } while (!tick.value.isIn)

        expect(tick.value.date).to.equal('2018-11-20');
    });

    it('should signal sell when short period moving average crosses longer period moving average downward', ()=> {
        const longPeriodData = {'2018-11-19': 40, '2018-11-20': 37, '2018-11-21': 35};
        const shortPeriodData = {'2018-11-19': 40, '2018-11-20': 35, '2018-11-21': 22};
        const startDate = new Date(2018, 10, 20);
        const smaCross = new SMACross(startDate, longPeriodData, shortPeriodData);
        let tick = null;

        do {
            tick = smaCross.nextValue()
        } while (tick.value.isIn)

        expect(tick.value.date).to.equal('2018-11-20');
    });

    it('should jump to the next existing date upon holidays and weekends', ()=> {
        const longPeriodData = {'2018-11-19': 40, '2018-11-23': 37, '2018-11-24': 35};
        const shortPeriodData = {'2018-11-19': 40, '2018-11-23': 35, '2018-11-24': 22};
        const startDate = new Date(2018, 10, 19);
        const smaCross = new SMACross(startDate, longPeriodData, shortPeriodData);
        let tick = null;
        const [firstTick, secondTick] = [smaCross.nextValue(), smaCross.nextValue()];

        expect(firstTick.value.date).to.equal('2018-11-19');
        expect(secondTick.value.date).to.equal('2018-11-23');
    });

});