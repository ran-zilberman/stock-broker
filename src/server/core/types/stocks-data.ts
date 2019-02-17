export interface StocksDataClient {
    fetchStockQuote(symbol: string): Promise<{[k: string]: StockQuoteDailyData}>;
    fetchRSI(symbol: string): Promise<{[k: string]: number}>;
}

export interface StockQuoteDailyData {
    start: number;
    close: number;
    low: number;
    high: number;
}
