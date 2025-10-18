"use client";
import React, { useMemo, useState } from "react";
import PricePill from "./PricePill";

type Props = {
  pairs: ReadonlyArray<string>;
  watchList: string[];
  onAdd: (symbol: string) => void;
  onRemove: (symbol: string) => void;
};

export default function CryptoList({
  pairs,
  watchList,
  onAdd,
  onRemove,
}: Props) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toUpperCase();
    return query ? pairs.filter((p) => p.includes(query)) : pairs;
  }, [q, pairs]);

  return (
    <div className="rounded-md p-5">
      {/* Search input */}
      <div className="flex items-center gap-3 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search pair (e.g. BTC)"
          className="w-full rounded-md bg-white/5 px-3 py-2 placeholder:text-slate-400 border-2 border-blue-950"
        />
      </div>

      {/* List of pairs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((sym) => {
          const isWatch = watchList.includes(sym);
          return (
            <div
              key={sym}
              className="bg-white/3 rounded-md p-4 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{sym}</div>
                <div className="text-sm text-slate-300">Spot pair</div>
              </div>

              <div className="flex items-center gap-3">
                {/* ✅ Live price */}
                <PricePill symbol={sym} />

                <div className="flex gap-2">
                  {!isWatch ? (
                    <button
                      onClick={() => onAdd(sym)}
                      className="px-3 py-1 rounded-md bg-green-500 hover:bg-green-600 text-sm border-2"
                    >
                      Add
                    </button>
                  ) : (
                    <button
                      onClick={() => onRemove(sym)}
                      className="px-3 py-1 rounded-md bg-amber-600 hover:bg-amber-500 text-sm border-2"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
