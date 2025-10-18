export const KNOWN_PAIRS = ["BTCUSDT", "ETHUSDT"] as const;
export type KnownPair = (typeof KNOWN_PAIRS)[number];

export type RecentTrade = {
  id: number;
  price: string;
  qty: string;
  time: number;
  isBuyerMaker: boolean;
};

/**
 * Client-side function to get latest trades from Binance.
 * Should be called from the browser (inside a "use client" component).
 */
export async function getRecentTradesClient(
  symbol: string,
  limit = 50
): Promise<RecentTrade[]> {
  const res = await fetch(
    `https://api.binance.com/api/v3/trades?symbol=${symbol}&limit=${limit}`
  );

  if (!res.ok) throw new Error("Failed to fetch Binance trades");

  const data = await res.json();
  return data.map((d: any) => ({
    id: d.id,
    price: d.price,
    qty: d.qty,
    time: d.time,
    isBuyerMaker: d.isBuyerMaker,
  }));
}
