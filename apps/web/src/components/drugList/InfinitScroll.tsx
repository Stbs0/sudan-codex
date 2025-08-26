// import { motion } from "motion/react";
import { JSX, useEffect, useRef } from "react";

/**
 * Props for the InfiniteScroll component.
 * @template T
 * @property {T[] | undefined} data - The data to be displayed.
 * @property {() => void} loadMore - Function to load more data.
 * @property {boolean} hasMore - Flag indicating if there is more data to load.
 * @property {(item: T, index: number) => React.ReactNode} renderItem - Function to render each item.
 */
interface InfiniteScrollProps<T> {
  data: T[] | undefined;
  loadMore: () => void;
  hasMore: boolean;
  renderItem: (item: T, index: number) => React.ReactNode;
}

// const variants = {
//   hidden: {
//     opacity: 0,
//   },
//   visible: { transition: { staggerChildren: 1 }, opacity: 1 },
// };

/**
 * InfiniteScroll component to handle infinite scrolling of data. needs refactoring
 * @template T
 * @param {InfiniteScrollProps<T>} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export function InfiniteScroll<T>({
  data,
  loadMore,
  hasMore,
  renderItem,
}: InfiniteScrollProps<T>): JSX.Element {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <div className='flex flex-col gap-4'>
      {data?.map((item, index) => <div>{renderItem(item, index)}</div>)}
      {hasMore && (
        <div
          ref={observerRef}
          className='h-10'
        />
      )}
    </div>
  );
}
