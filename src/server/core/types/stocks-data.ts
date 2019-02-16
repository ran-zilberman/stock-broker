export interface StocksDataClient {
    fetchStockQuote(symbol: string): Promise<StockQuoteDailyData[]>;
    fetchRSI(symbol: string): Promise<StockRSIDailyData[]>;
}

export interface StockQuoteDailyData {
    start: number;
    close: number;
    low: number;
    high: number;
}

export interface StockRSIDailyData {
    value: number;
}