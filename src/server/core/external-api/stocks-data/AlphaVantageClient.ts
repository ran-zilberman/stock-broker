import { StocksDataClient, StockQuoteDailyData, StockRSIDailyData } from '../../types/stocks-data';
import axios, { AxiosResponse } from 'axios';

export class AlphaVantageClient implements StocksDataClient {

    private baseUrl = 'https://www.alphavantage.co/query?apikey=4QGFC715RDLOPP1P';
    
    async fetchStockQuote(symbol: string): Promise<StockQuoteDailyData[]> {
        const reponse = await axios.get(`${this.baseUrl}&symbol=${symbol}&function=TIME_SERIES_DAILY`);
        return convertDailyQuotesToDomain(reponse.data);
    }

    async fetchRSI(symbol: string): Promise<StockRSIDailyData[]> {
        const reponse = await axios.get(`${this.baseUrl}&symbol=${symbol}&function=RSI&interval=daily&time_period=14&series_type=close`);
        return convertDailyRSIToDomain(reponse.data);
    }

}

function convertDailyQuotesToDomain(data): Array<StockQuoteDailyData> {
    const dailyData = data['Time Series (Daily)'];
    return Object.keys(dailyData).reduce((result, key) => {
        return [...result, {
            start: dailyData[key]['1. open'],
            high: dailyData[key]['2. high'],
            low: dailyData[key]['3. low'],
            close: dailyData[key]['4. close'],
            date: key
        }];
    }, []);
}

function convertDailyRSIToDomain(data): Array<StockRSIDailyData> {
    const dailyData = data['Technical Analysis: RSI'];
    return Object.keys(dailyData).reduce((result, key) => {
        return [...result, {
            value: dailyData[key]['RSI'],
            date: key
        }];
    }, []);
}