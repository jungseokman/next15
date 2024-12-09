import { BookData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import style from "./book-item.module.css";

export default function BookItem({
  id,
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link href={`/book/${id}`} className={style.container}>
      <Image
        src={coverImgUrl}
        alt="도서 사진"
        width={100}
        height={150}
        style={{ width: "auto", height: "auto" }}
        priority
      />
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <br />
        <div className={style.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
