"use client";
import React, { useState } from "react";
import { RecentTrade } from "../../lib/binance";

export type TradeListProps = {
  initialTrades: RecentTrade[];
  symbol: string;
};

async function fetchTrades(symbol: string) {
  const res = await fetch(
    `https://api.binance.com/api/v3/trades?symbol=${symbol}&limit=30`
  );
  if (!res.ok) throw new Error("Failed to fetch trades");
  return res.json() as Promise<RecentTrade[]>;
}

export default function TradeList({ initialTrades, symbol }: TradeListProps) {
  const [trades, setTrades] = useState<RecentTrade[]>(initialTrades || []);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const t = await fetchTrades(symbol);
      setTrades(t);
    } catch (e) {
      console.error("Failed to refresh trades", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-slate-300">
          Showing latest {trades.length} trades
        </div>
        <div className="flex gap-2">
          <button
            onClick={refresh}
            className="px-3 py-1 rounded-md border text-sm hover:bg-white/10 transition"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Column labels */}
      <div className="grid grid-cols-3 text-sm text-slate-400 border-b border-white/10 pb-2 mb-2">
        <div>Price (USDT) / Time</div>
        <div className="text-center">Quantity</div>
        <div className="text-right">Side</div>
      </div>

      {/* Trade rows */}
      <div className="space-y-2">
        {trades.map((t) => (
          <div
            key={t.id}
            className="grid grid-cols-3 items-center bg-white/3 p-3 rounded-md"
          >
            {/* Price + Time */}
            <div>
              <div className="font-medium">
                {parseFloat(t.price).toFixed(6)}
              </div>
              <div className="text-xs text-slate-400">
                {new Date(t.time).toLocaleString()}
              </div>
            </div>

            {/* Quantity */}
            <div className="text-center text-sm text-slate-200">{t.qty}</div>

            {/* Side (Buy / Sell) */}
            <div
              className={`text-sm text-right font-medium ${
                t.isBuyerMaker ? "text-rose-400" : "text-green-400"
              }`}
            >
              {t.isBuyerMaker ? "Sell" : "Buy"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
