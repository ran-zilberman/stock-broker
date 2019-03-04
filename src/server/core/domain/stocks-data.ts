export type RSIData = {[k: string]: number};
export type MACDData = {[k: string]: MACDDailyData};
export type QuoteData = {[k: string]: StockQuoteDailyData};

export interface MACDDailyData {
    histogram: number, macd: number, macdSignal: number
}

export interface StocksDataClient {
    fetchStockQuote(symbol: string): Promise<QuoteData>;
    fetchRSI(symbol: string): Promise<RSIData>;
    fetchMACD(symbol: string): Promise<MACDData>
}

export interface StockQuoteDailyData {
    start: number;
    close: number;
    low: number;
    high: number;
}

