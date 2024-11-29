import { useRouter } from "next/router";

const BookDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  return <h1>Book {id}</h1>;
};

export default BookDetail;
