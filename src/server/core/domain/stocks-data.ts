export type TimeSeries<T> = {[k: string]: T};
export type QuoteData = TimeSeries<StockQuoteDailyData>;

export interface MACDDailyData {
    histogram: number, macd: number, macdSignal: number
}

export interface StocksDataClient {
    fetchStockQuote(symbol: string): Promise<TimeSeries<StockQuoteDailyData>>;
    fetchRSI(symbol: string): Promise<TimeSeries<number>>;
    fetchMACD(symbol: string): Promise<TimeSeries<MACDDailyData>>;
    fetchMA(symbol: string, timePeriod: number): Promise<TimeSeries<number>>;
}

export interface StockQuoteDailyData {
    start: number;
    close: number;
    low: number;
    high: number;
}

