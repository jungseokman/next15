import BookItem from "@/components/book item";
import SearchableLayout from "@/components/searchable-layout";
import books from "@/mock/books.json";
import { ReactNode } from "react";

const Search = () => {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

export default Search;

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
