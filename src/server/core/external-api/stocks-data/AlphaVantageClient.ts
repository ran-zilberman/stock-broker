import { MACDDailyData, TimeSeries } from './../../domain/stocks-data';
import { StocksDataClient, StockQuoteDailyData } from '../../domain/stocks-data';
import axios from 'axios';

export class AlphaVantageClient implements StocksDataClient {

    private baseUrl = 'https://www.alphavantage.co/query?apikey=4QGFC715RDLOPP1P';
    
    async fetchStockQuote(symbol: string): Promise<TimeSeries<StockQuoteDailyData>> {
        const reponse = await axios.get(`${this.baseUrl}&symbol=${symbol}&function=TIME_SERIES_DAILY`);
        return convertDailyQuotesToDomain(reponse.data);
    }

    async fetchRSI(symbol: string): Promise<TimeSeries<number>> {
        const reponse = await axios.get(`${this.baseUrl}&symbol=${symbol}&function=RSI&interval=daily&time_period=14&series_type=close`);
        return convertDailyRSIToDomain(reponse.data);
    }

    async fetchMACD(symbol: string): Promise<TimeSeries<MACDDailyData>> {
        const reponse = await axios.get(`${this.baseUrl}&symbol=${symbol}&function=MACD&interval=daily&series_type=close`);
        return convertDailyMACDToDomain(reponse.data);
    }

    async fetchMA(symbol: string, timePeriod: number): Promise<TimeSeries<number>> {
        const reponse = await axios.get(`${this.baseUrl}&symbol=${symbol}&time_period=${timePeriod}&function=SMA&interval=daily&series_type=close`);
        return convertDailyMAToDomain(reponse.data);
    }

}

function convertDailyQuotesToDomain(data): TimeSeries<StockQuoteDailyData> {
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

function convertDailyMAToDomain(data): TimeSeries<number> {
    const dailyData = data['Technical Analysis: SMA'];
    return Object.keys(dailyData).reduce((result, key) => {
        result[key]=  dailyData[key]['SMA'];
        return result;
    }, {});
}

function convertDailyRSIToDomain(data): TimeSeries<number> {
    const dailyData = data['Technical Analysis: RSI'];
    return Object.keys(dailyData).reduce((result, key) => {
        result[key]=  dailyData[key]['RSI'];
        return result;    
    }, {});

}

function convertDailyMACDToDomain(data): TimeSeries<MACDDailyData> {
    const dailyData = data['Technical Analysis: MACD'];
    return Object.keys(dailyData).reduce((result, key) => {
        const macdDailyData: MACDDailyData = {
            histogram: dailyData[key]['MACD_Hist'],
            macd: dailyData[key]['MACD'],
            macdSignal: dailyData[key]['MACD_Signal']
        }
        result[key] = macdDailyData;
        return result;    
    }, {});

}
