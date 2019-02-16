import { AlphaVantageClient } from './AlphaVantageClient';
import { StocksDataClient } from '../../types/stocks-data';

export class StocksDataClientFactory {

    static getInstance(): StocksDataClient {
        return new AlphaVantageClient();
    }
}
