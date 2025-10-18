const KEY = "kb_watchlist_v1";

export function loadWatchList(): string[] {
  try {
    const raw =
      typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveWatchList(list: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
}
