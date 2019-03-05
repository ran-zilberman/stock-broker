import { MACD } from './../../../core/technical-indicators/MACD';
import { StocksDataClientFactory } from '../../../core/external-api/stocks-data';

export interface QuantoResponse {
    value: string;
}

export async function quanto(req, res) {
    const stocksDataClient = StocksDataClientFactory.getInstance();
    const apiResponse = await stocksDataClient.fetchMA('MSFT', 50);
    // const currentDate = new Date();
    // const tenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 100));

    // const macd = new MACD(tenDaysAgo, apiResponse);
    // const response = [];
    // let tick: IteratorResult<{date: string, isIn: boolean}> = null;
    // do {
    //     tick = macd.nextValue();
    //     response.push(tick.value);
    // }
    // while (!tick.done);
    // console.log(response);
    res.send(apiResponse);
}