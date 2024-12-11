import fetchBooks from "@/lib/fetch-books";
import fetchOneBook from "@/lib/fetch-one-book";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import style from "./[id].module.css";

export async function getStaticPaths() {
  const books = await fetchBooks();
  const paths = books.slice(0, 100).map((book) => ({
    params: { id: book.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params?.id;
  const book = await fetchOneBook(Number(id));
  if (!book) {
    return {
      notFound: true,
    };
  }
  return {
    props: { book },
  };
}

const BookDetail = ({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  if (router.isFallback) {
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
        <div>Loading...</div>
      </>
    );
  }
  if (!book) return <div>존재하지 않는 책입니다.</div>;

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:image" content={coverImgUrl} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <Image
            src={coverImgUrl}
            alt="도서 사진"
            width={100}
            height={150}
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </div>

        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
};

export default BookDetail;
