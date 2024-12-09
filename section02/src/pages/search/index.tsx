import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

// export async function getStaticProps(context: GetStaticPropsContext) {
//   const q = context.params?.q;

//   const books = await fetchBooks(q as string);

//   return {
//     props: { books },
//   };
// }

const Search = () => {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();

  const q = router.query.q;

  const fetchSearchBooks = async () => {
    const books = await fetchBooks(q as string);
    setBooks(books);
  };

  useEffect(() => {
    if (!q) return;
    fetchSearchBooks();
  }, [q]);

  return (
    <div>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta name="og:title" content="한입북스 - 검색결과" />
        <meta
          name="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
        <meta name="og:image" content="/thumbnail.png" />
      </Head>
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
