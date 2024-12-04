import Link from "next/link";
import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  box-shadow: rgba(100, 100, 100, 0.2) 0px 0px 29px 0px;
  padding: 0px 15px;
`;

const Header = styled.header`
  height: 60px;
  font-weight: bold;
  font-size: 18px;
  line-height: 60px;

  > a {
    color: black;
    text-decoration: none;
  }
`;

const Main = styled.main`
  padding-top: 10px;
`;

const Footer = styled.footer`
  padding: 100px 0px;
  color: grey;
`;

const GlobalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <Header>
        <Link href={"/"}>🦋 ONEBITE BOOKS</Link>
      </Header>
      <Main>{children}</Main>
      <Footer>제작 @seokman</Footer>
    </Container>
  );
};

export default GlobalLayout;
