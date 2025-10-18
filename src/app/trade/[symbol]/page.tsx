"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import TradeList from "../../components/TradeList";
import { getRecentTradesClient, RecentTrade } from "../../../lib/binance";

type Props = { params: Promise<{ symbol: string }> };

export default function TradePage({ params }: Props) {
  const { symbol } = React.use(params);
  const upperSymbol = symbol?.toUpperCase();

  const [trades, setTrades] = useState<RecentTrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!upperSymbol) return;

    setLoading(true);
    getRecentTradesClient(upperSymbol, 30)
      .then((res) => setTrades(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [upperSymbol]);

  if (!upperSymbol) return <div>Invalid symbol</div>;

  if (error)
    return (
      <div className="p-6 text-red-400">
        ❌ Failed to load trades for {upperSymbol}: {error}
      </div>
    );

  if (loading)
    return (
      <div className="p-6 text-slate-400">
        Loading latest trades for {upperSymbol}...
      </div>
    );

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Recent Trades — {upperSymbol}</h1>
        <Link href="/" className="text-sm text-slate-300 hover:text-black">
          ← Back
        </Link>
      </div>

      <TradeList initialTrades={trades} symbol={upperSymbol} />
    </div>
  );
}
