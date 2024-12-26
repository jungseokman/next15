import BookPage from "@/app/book/[id]/page";

export default function Page(props: any) {
  console.log(props);

  return (
    <div>
      가로채기 성공
      <BookPage {...props} />
    </div>
  );
}
