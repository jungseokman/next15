import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import style from "./index.module.css";

const Home = () => {
  return (
    <>
      <h1 className={style.h1}>인덱스</h1>
      <h2 className={style.h2}>인덱스</h2>
    </>
  );
};

export default Home;

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
