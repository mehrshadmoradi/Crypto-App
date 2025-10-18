"use client";
import { useEffect, useState } from "react";
import { saveWatchList, loadWatchList } from "../lib/storage";

export function useWatchList() {
  const [watchList, setWatchList] = useState<string[]>(() => loadWatchList());

  useEffect(() => {
    saveWatchList(watchList);
  }, [watchList]);

  function addSymbol(sym: string) {
    setWatchList((prev) => {
      if (prev.includes(sym)) return prev;
      return [sym, ...prev].slice(0, 20);
    });
  }

  function removeSymbol(sym: string) {
    setWatchList((prev) => prev.filter((s) => s !== sym));
  }

  return { watchList, addSymbol, removeSymbol };
}
