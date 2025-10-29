const DEFAULT_API_TIMEOUT = 5000;

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = DEFAULT_API_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export { fetchWithTimeout };
