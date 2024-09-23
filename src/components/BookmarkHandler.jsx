import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useGlobalStore from '@/stores/useGlobalStore';

export default function BookmarkHandler() {
  const API_URL = import.meta.env.VITE_PB_URL;
  const currentUserId = useGlobalStore((state) => state.currentUserId);
  const bookmarkedPostIds = useGlobalStore((state) => state.bookmarkedPostIds);
  const setBookmarkedPostIds = useGlobalStore(
    (state) => state.setBookmarkedPostIds
  );
  const [bookmarksPbId, setBookmarksPbId] = useState(null);

  useQuery({
    queryKey: ['bookmarks', currentUserId],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/collections/bookmarks/records`, {
          params: {
            filter: `(userId="${currentUserId}")`,
          },
        })
        .then((res) => {
          setBookmarkedPostIds(res.data?.items[0].postId);
          setBookmarksPbId(res.data?.items[0].id);
          return res.data;
        }),
  });

  useEffect(() => {
    if (!bookmarksPbId || bookmarkedPostIds?.length < 0) return;

    const updatebookmarks = async () => {
      try {
        await axios.patch(
          `${API_URL}/api/collections/bookmarks/records/${bookmarksPbId}`,
          {
            postId: bookmarkedPostIds,
          }
        );
        // console.log('Bookmarks updated successfully');
      } catch (error) {
        console.error('Error updating bookmarks:', error);
      }
    };

    updatebookmarks();
  }, [bookmarkedPostIds, bookmarksPbId, API_URL]);

  return null;
}
