import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

const SearchbarContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  > input {
    flex: 1;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid rgb(220, 220, 220);
  }

  > button {
    width: 80px;
    border-radius: 5px;
    border: none;
    background-color: rgb(37, 147, 255);
    color: white;
    cursor: pointer;
  }
`;

const SearchableLayout = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSubmit();
  };

  return (
    <div>
      <SearchbarContainer>
        <input
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요..."
        />
        <button onClick={onSubmit}>검색</button>
      </SearchbarContainer>
      {children}
    </div>
  );
};

export default SearchableLayout;
