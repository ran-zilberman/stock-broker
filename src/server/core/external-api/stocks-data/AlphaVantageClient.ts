import { StocksDataClient, StockQuoteDailyData, StockRSIDailyData } from '../../types/stocks-data';
import axios, { AxiosResponse } from 'axios';

export class AlphaVantageClient implements StocksDataClient {

    private baseUrl = 'https://www.alphavantage.co/query?apikey=4QGFC715RDLOPP1P';
    
    async fetchStockQuote(symbol: string): Promise<{[k: string]: StockQuoteDailyData}> {
        const reponse = await axios.get(`${this.baseUrl}&symbol=${symbol}&function=TIME_SERIES_DAILY`);
        return convertDailyQuotesToDomain(reponse.data);
    }

    async fetchRSI(symbol: string): Promise<{[k: string]: number}> {
        const reponse = await axios.get(`${this.baseUrl}&symbol=${symbol}&function=RSI&interval=daily&time_period=14&series_type=close`);
        return convertDailyRSIToDomain(reponse.data);
    }

}

function convertDailyQuotesToDomain(data): {[k: string]: StockQuoteDailyData} {
    const dailyData = data['Time Series (Daily)'];
    return Object.keys(dailyData).reduce((result, key) => {
        result[key] = {
            start: dailyData[key]['1. open'],
            high: dailyData[key]['2. high'],
            low: dailyData[key]['3. low'],
            close: dailyData[key]['4. close']
        };
        return result;
    }, {});
}
//
function convertDailyRSIToDomain(data): {[k: string]: number} {
    const dailyData = data['Technical Analysis: RSI'];
    return Object.keys(dailyData).reduce((result, key) => {
        result[key]=  dailyData[key]['RSI'];
        return result;    
    }, {});

}