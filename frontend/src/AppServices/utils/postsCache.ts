const CACHE_KEY = "for_you_posts";
const STALE_TIME = 1000 * 60 * 5;

export function getCachedPosts() {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (!cached) {
    console.log("returning first null");

    return null;
  }

  const { data, timestamp } = JSON.parse(cached);
  const now = Date.now();

  if (now - timestamp > STALE_TIME) {
    console.log("returning second null");
    return null; // stale
  }

  if (data) {
    return data;
  } else {
    console.log("returning third null");
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stringifyWithBigInt(obj: any) {
  return JSON.stringify(obj, (_key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setCachedPosts(data: any[]) {
  const payload = {
    data,
    timestamp: Date.now(),
  };
  sessionStorage.setItem(CACHE_KEY, stringifyWithBigInt(payload));
}
