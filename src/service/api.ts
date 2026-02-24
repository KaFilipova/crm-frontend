const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export interface ApiError {
  message: string;
  status: number;
  body?: unknown;
}

export function createApiError(
  message: string,
  status: number,
  body?: unknown
): ApiError {
  return { message, status, body };
}

export function isApiError(err: unknown): err is ApiError {
  return (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    "status" in err
  );
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  token?: string | null;
}

export async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, token, headers: customHeaders, ...init } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let data: unknown;
  const contentType = response.headers.get("Content-Type");
  if (contentType?.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null && "message" in data
        ? String((data as { message: unknown }).message)
        : typeof data === "string"
          ? data
          : `Request failed with status ${response.status}`;
    throw createApiError(message, response.status, data);
  }

  return data as T;
}
