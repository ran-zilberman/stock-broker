import { StocksDataClientFactory } from '../../../core/external-api/stocks-data';

export interface QuantoResponse {
    value: string;
}

export async function quanto(req, res) {
    const stocksDataClient = StocksDataClientFactory.getInstance();
    const apiResponse = await stocksDataClient.fetchRSI('MSFT');
    console.log(apiResponse);
    res.send(apiResponse);
}