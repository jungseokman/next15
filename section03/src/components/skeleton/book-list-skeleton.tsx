import BookItemSkeleton from "./book-item-skeleton";

export default function BookListSkeleton({ count }: { count: number }) {
  return Array.from({ length: count }, (_, index) => (
    <BookItemSkeleton key={`book-item-skeleton-${index}`} />
  ));
}
