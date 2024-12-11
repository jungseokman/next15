import { BookData } from "@/types";

export interface BookState {
  books: BookData[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  book: BookState;
}
