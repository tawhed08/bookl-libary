import type { Book } from "@/types/book";

const API_URL = "http://localhost:5000/api/books";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, { cache: "no-store", ...options });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        `Cannot reach the books API at ${API_URL}. Check that the backend is running and reachable.`
      );
    }

    throw error;
  }

  const responseText = await response.text();
  let data: unknown;

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      throw new Error(`The books API returned invalid JSON (HTTP ${response.status}).`);
    }
  }

  if (!response.ok) {
    const apiMessage =
      typeof data === "object" && data !== null && "message" in data &&
      typeof data.message === "string"
        ? data.message
        : response.statusText || "Request failed";
    throw new Error(`Books API error (HTTP ${response.status}): ${apiMessage}`);
  }

  if (data === undefined) {
    throw new Error(`The books API returned an empty response (HTTP ${response.status}).`);
  }

  return data as T;
}

export async function getBooks(
  filters: { search?: string; category?: string } = {},
  signal?: AbortSignal
): Promise<Book[]> {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);

  const query = params.toString();
  const url = query ? `${API_URL}?${query}` : API_URL;
  const data = await request<unknown>(url, { signal });

  if (!Array.isArray(data)) {
    throw new Error("The books API returned an unexpected response. Expected a list of books.");
  }

  return data as Book[];
}

export async function getBook(id: string, signal?: AbortSignal): Promise<Book> {
  return request<Book>(`${API_URL}/${encodeURIComponent(id)}`, { signal });
}

export async function createBook(book: {
  title: string;
  author: string;
  category: string;
  description: string;
  publishedYear: number;
}) {
  return request<Book>(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
}

export async function updateBook(id: string, book: object) {
  return request<Book>(`${API_URL}/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
}

export async function deleteBook(id: string) {
  return request<{ message: string }>(`${API_URL}/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}