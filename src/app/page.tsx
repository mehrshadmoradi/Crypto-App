"use client";
import React, { useState, useEffect } from "react";
import CryptoList from "./components/CryptoList";
import dynamic from "next/dynamic";
import { useWatchList } from "../hooks/useWatchList";
import { KNOWN_PAIRS } from "../lib/binance";

// Dynamic import of WatchList to prevent SSR mismatch
const WatchList = dynamic(() => import("./components/WatchList"), {
  ssr: false,
});

export default function Home() {
  const { watchList, addSymbol, removeSymbol } = useWatchList();
  const [mounted, setMounted] = useState(false);

  // Only render client-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent SSR mismatch

  return (
    <div className="space-y-8 p-2">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left panel */}
        <div className="bg-white/5 rounded-xl p-6 border-2 shadow-md shadow-black">
          <h2 className="text-lg font-semibold mb-3 text-center">
            Known Pairs
          </h2>
          <CryptoList
            pairs={KNOWN_PAIRS}
            watchList={watchList}
            onAdd={addSymbol}
            onRemove={removeSymbol}
          />
        </div>

        {/* Right panel */}
        <aside className="bg-white/5 rounded-xl p-6 border-2 shadow-md shadow-black">
          <h2 className="text-lg font-semibold mb-3 text-center">Watch-List</h2>
          <WatchList watchList={watchList} onRemove={removeSymbol} />
        </aside>
      </section>
    </div>
  );
}
