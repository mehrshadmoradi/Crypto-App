"use client";
import React from "react";
import usePrice from "../../hooks/usePrice";

type Props = { symbol: string };

export default function PricePill({ symbol }: Props) {
  const { price, change } = usePrice(symbol);

  const changeClass =
    change === undefined
      ? "text-slate-300"
      : change >= 0
      ? "text-green-400"
      : "text-red-400";

  return (
    <div className="text-right">
      {/* Show live price */}
      <div className="text-sm font-medium">
        {price ?? <span className="text-slate-400">—</span>}
      </div>

      {/* Show 24h change (if available) */}
      <div className={`text-xs ${changeClass}`}>
        {typeof change === "number"
          ? change >= 0
            ? `+${change.toFixed(2)}`
            : change.toFixed(2)
          : ""}
      </div>
    </div>
  );
}
