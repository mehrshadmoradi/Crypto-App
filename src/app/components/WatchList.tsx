"use client";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

type Props = {
  watchList: string[];
  onRemove: (sym: string) => void;
};

const PricePill = dynamic(() => import("./PricePill"), { ssr: false });

export default function WatchList({ watchList, onRemove }: Props) {
  if (!watchList.length) {
    return (
      <div className="text-slate-300">
        No items in watch-list yet. Add BTCUSDT or ETHUSDT.
      </div>
    );
  }

  return (
    <div className="space-y-3 p-5">
      {watchList.map((sym) => (
        <div
          key={sym}
          className="flex items-center justify-between p-3 rounded-md bg-white/3"
        >
          <div className="flex items-center gap-3">
            <div className="font-medium">{sym}</div>
            <PricePill symbol={sym} />
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/trade/${sym}`}
              className="text-sm px-3 py-1 border rounded-md text-slate-100 bg-blue-500 hover:bg-blue-600 border-white/10"
            >
              Trade
            </Link>
            <button
              onClick={() => onRemove(sym)}
              className="text-sm px-3 py-1 rounded-md bg-rose-600/90 border-2"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
