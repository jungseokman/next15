import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal";

export default function Page(props: { params: Promise<{ id: string }> }) {
  console.log(props);

  return (
    <Modal>
      <BookPage {...props} />
    </Modal>
  );
}
