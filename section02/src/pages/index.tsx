import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import fetchRandomBooks from "@/lib/fetch-random-books";
import { AppDispatch } from "@/store";
import { fetchBooksRequest } from "@/store/actions/bookActions";
import { RootState } from "@/store/types";
import { BookData } from "@/types";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export const getStaticProps = async () => {
  const randomBooks = await fetchRandomBooks();

  return {
    props: {
      randomBooks,
    },
  };
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & h3 {
    margin-bottom: 0;
  }
`;

const Home = ({
  randomBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, loading, error } = useSelector(
    (state: RootState) => state.book
  );

  useEffect(() => {
    dispatch(fetchBooksRequest());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta name="og:title" content="한입북스" />
        <meta
          name="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
        <meta name="og:image" content="/thumbnail.png" />
      </Head>
      <Container>
        <section>
          <h3>지금 추천하는 도서</h3>
          {randomBooks &&
            randomBooks.map((book: BookData) => (
              <BookItem key={book.id} {...book} />
            ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {books &&
            books.map((book: BookData) => <BookItem key={book.id} {...book} />)}
        </section>
      </Container>
    </>
  );
};

export default Home;

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
