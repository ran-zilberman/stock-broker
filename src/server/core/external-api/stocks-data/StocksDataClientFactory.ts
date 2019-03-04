import { AlphaVantageClient } from './AlphaVantageClient';
import { StocksDataClient } from '../../domain/stocks-data';

export class StocksDataClientFactory {

    static getInstance(): StocksDataClient {
        return new AlphaVantageClient();
    }
}
