import { useState } from 'react';

export function useLoadMore(initialCount = 10, increment = 10) {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const handleShowMore = (totalCount) => {
    setVisibleCount((prev) => Math.min(prev + increment, totalCount));
  };

  return { visibleCount, handleShowMore };
}
