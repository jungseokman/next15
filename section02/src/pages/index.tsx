import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import styled from "styled-components";

export const getStaticProps = async () => {
  const [allBooks, randomBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
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
  allBooks,
  randomBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta name="og:title" content="한입북스" />
        <meta name="og:description" content="한입 북스에 등록된 도서들을 만나보세요" />
        <meta name="og:image" content="/thumbnail.png" />
      </Head>
      <Container>
        <section>
          <h3>지금 추천하는 도서</h3>
          {randomBooks &&
            randomBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks &&
            allBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </section>
      </Container>
    </>
  );
};

export default Home;

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
