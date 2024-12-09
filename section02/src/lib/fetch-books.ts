import { BookData } from "@/types";

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  const url = `http://localhost:12345/book${q ? `/search?q=${q}` : ""}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error();

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
