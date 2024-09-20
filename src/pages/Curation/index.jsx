import { Fragment, useState, useEffect } from 'react';
import Card from '@/components/Card/Card';
import pb from '@/api/pb';
import S from './Curation.module.css';
import AppSpinner from '@/components/AppSpinner/AppSpinner';

function Curation() {
  const [bookmarkCardList, setBookmarkCardList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [bookmarkedPostIds, setBookmarkedPostIds] = useState([]);

  const loggedInUserId = pb.authStore.model?.id;

  if (!loggedInUserId) {
    console.error('로그인된 사용자의 정보를 가져오지 못했습니다.');
    return null;
  }

  const fetchAllBookmarkedPosts = async () => {
    setIsFetching(true);
    try {
      const bookmarkResponse = await pb.collection('bookmarks').getFullList({
        filter: `userId="${loggedInUserId}"`,
      });

      const bookmarkedPostIds = bookmarkResponse.flatMap((bookmark) =>
        Array.isArray(bookmark.postId) ? bookmark.postId : [bookmark.postId]
      );
      setBookmarkedPostIds(bookmarkedPostIds);

      if (bookmarkedPostIds.length > 0) {
        const postResponses = await Promise.all(
          bookmarkedPostIds.map(async (postId) => {
            const postResponse = await pb.collection('posts').getOne(postId);
            return postResponse;
          })
        );

        setBookmarkCardList(postResponses);
      } else {
        console.log('북마크된 postId가 없습니다.');
      }
    } catch (error) {
      console.error(error);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    fetchAllBookmarkedPosts();
  }, [loggedInUserId]);

  return (
    <section className={S.curation}>
      {isFetching ? (
        <AppSpinner />
      ) : (
        <div className={S.curationCardList}>
          {bookmarkCardList.map((item, idx) => (
            <Fragment key={idx}>
              <Card
                type="post"
                id={item.id}
                postId={item.id}
                photo={item.photo}
                collectionId={item.collectionId}
                likedNum={item.likedNum || 0}
                placeName={item.placeName}
                placePosition={item.placePosition}
                userId={item.userId}
              />
            </Fragment>
          ))}
        </div>
      )}
    </section>
  );
}

export default Curation;
