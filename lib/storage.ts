const KEYS = {
  watched: "mcuverse:watched",
  introSeen: "mcuverse:introSeen",
  lastWatched: "mcuverse:lastWatched",
  watchOrder: "mcuverse:watchOrder",
} as const;

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {

    try {
      window.localStorage.removeItem(key);
    } catch {

    }
    return fallback;
  }
}

function safeSet<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {

  }
}

export function getWatchedItems(): string[] {
  return safeGet<string[]>(KEYS.watched, []);
}

export function setWatchedItems(ids: string[]) {
  safeSet(KEYS.watched, ids);
}

export function markAsWatched(id: string) {
  const ids = new Set(getWatchedItems());
  ids.add(id);
  setWatchedItems([...ids]);
  setLastWatched(id);
}

export function markAsUnwatched(id: string) {
  const ids = new Set(getWatchedItems());
  ids.delete(id);
  setWatchedItems([...ids]);
}

export function getIntroSeen(): boolean {
  return safeGet<boolean>(KEYS.introSeen, false);
}

export function setIntroSeen(value: boolean) {
  safeSet(KEYS.introSeen, value);
}

export function getLastWatched(): string | null {
  return safeGet<string | null>(KEYS.lastWatched, null);
}

export function setLastWatched(id: string) {
  safeSet(KEYS.lastWatched, id);
}

export function getWatchOrder(): "release" | "chronological" {
  return safeGet<"release" | "chronological">(KEYS.watchOrder, "release");
}

export function setWatchOrder(order: "release" | "chronological") {
  safeSet(KEYS.watchOrder, order);
}
