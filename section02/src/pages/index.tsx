import BookItem from "@/components/book item";
import SearchableLayout from "@/components/searchable-layout";
import books from "@/mock/books.json";
import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.h1`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 16px;

  & h3 {
    margin-bottom: 0;
  }
`;

const Home = () => {
  return (
    <Container>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books && books.map((book) => <BookItem key={book.id} {...book} />)}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books && books.map((book) => <BookItem key={book.id} {...book} />)}
      </section>
    </Container>
  );
};

export default Home;

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
