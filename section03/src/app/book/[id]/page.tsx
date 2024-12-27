import ReviewEditor from "@/components/review-editor";
import ReviewItem from "@/components/review-item";
import { BookData, ReviewData } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import style from "./page.module.css";

// 동적 페이지 생성 비활성화
// export const dynamicParams = false;

// 정적 페이지 생성
export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const books: BookData[] = await response.json();
  return books.map((book) => ({ id: book.id.toString() }));
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/${bookId}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }
  const book: BookData = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image
          src={coverImgUrl}
          alt={`${title} 책 표지`}
          width={240}
          height={300}
        />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/review/book/${bookId}`,
    { next: { tags: [`reviews-${bookId}`] } }
  );

  if (!response.ok) {
    throw new Error(
      `리뷰를 불러오는 중 오류가 발생했습니다. : ${response.statusText}`
    );
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${id}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const book: BookData = await response.json();

  return {
    title: `한입북스 - ${book.title}`,
    description: `${book.description}`,
    openGraph: {
      title: `한입북스 - ${book.title}`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
