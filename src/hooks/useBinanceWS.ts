"use client";
import { useEffect, useRef, useState } from "react";

/**
 * useBinanceWS subscribes to a set of symbols and provides last price map.
 * It uses Binance combined stream endpoint.
 */
export default function useBinanceWS(symbols: string[]) {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const wsRef = useRef<WebSocket | null>(null);
  const subRef = useRef(symbols);

  useEffect(() => {
    subRef.current = symbols;
  }, [symbols]);

  useEffect(() => {
    if (!symbols || symbols.length === 0) {
      // close existing
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      return;
    }

    const lower = symbols.map((s) => s.toLowerCase() + "@trade").join("/");
    const url = `wss://stream.binance.com:9443/stream?streams=${lower}`;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data);
        // combined stream structure: { stream, data: {...} }
        const d = msg.data;
        if (!d) return;
        const symbol = d.s as string;
        const price = parseFloat(d.p);
        setPrices((prev) => ({ ...prev, [symbol]: price }));
      } catch (e) {}
    };

    ws.onopen = () => {
      // Opened
    };

    ws.onclose = () => {
      // Try no automatic reconnect here; if desired add backoff reconnect
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [symbols.join(",")]);

  return { prices };
}
