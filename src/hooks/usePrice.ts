"use client";
import useBinanceWS from "./useBinanceWS";

export interface UsePriceResult {
  price: string | undefined;
  change: number | undefined;
}

/**
 * Hook to get live price of a symbol from Binance WebSocket.
 * Returns formatted price (string) and optional change (number | undefined).
 */
export default function usePrice(symbol: string): UsePriceResult {
  const { prices } = useBinanceWS([symbol]);
  const rawPrice = prices[symbol]; // number | undefined

  // Explicit typing prevents 'never' issues
  const change: number | undefined = undefined;

  return {
    price: rawPrice !== undefined ? rawPrice.toFixed(6) : undefined,
    change,
  };
}
