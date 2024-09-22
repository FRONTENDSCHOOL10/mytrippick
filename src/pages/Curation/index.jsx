import { Fragment, useState, useEffect } from 'react';
import Card from '@/components/Card/Card';
import pb from '@/api/pb';
import S from './Curation.module.css';
import AppHelmet from '@/components/AppHelmet/AppHelmet';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useGlobalStore from '@/stores/useGlobalStore';

function Curation() {
  const bookmarkedPostIds = useGlobalStore((state) => state.bookmarkedPostIds);
  const setBookmarkedPostIds = useGlobalStore(
    (state) => state.setBookmarkedPostIds
  );

  const API_URL = import.meta.env.VITE_PB_URL;
  const loggedInUserId = pb.authStore.model?.id;
  const [list, setList] = useState();
  const [count, setCount] = useState(0);

  useQuery({
    queryKey: ['bookmark', loggedInUserId],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/collections/bookmarks/records`, {
          params: {
            filter: `userId="${loggedInUserId}"`,
          },
        })
        .then((res) => {
          const items = res.data.items || [];
          setBookmarkedPostIds(items?.[0]?.postId);
          return res.data;
        }),
  });

  useQuery({
    queryKey: ['postData', bookmarkedPostIds],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/collections/posts/records`, {
          params: {
            filter: bookmarkedPostIds.map((id) => `id='${id}'`).join(' || '),
          },
        })
        .then((res) => {
          const items = res.data.items || [];
          const sortedItems = bookmarkedPostIds.map(
            (id) =>
              items.find((item) => item.id === id) || {
                id,
                name: 'Unknown User',
              }
          );
          setCount(count + 1);
          count === 0 && setList(sortedItems.reverse());
          return { ...res.data, items: sortedItems.reverse() };
        }),
  });

  useEffect(() => {}, [list]);

  useEffect(() => {}, [count]);

  return (
    <>
      <h1 className={`headline2 ${S.sectionTitle}`}>나만의 큐레이션</h1>
      <section className={S.curation}>
        <AppHelmet title={'나만의 큐레이션'} />
  
        <div className={list?.length > 0 ? S.curationCardList : S.noPost}>
          {list?.length > 0 ? (
            list.map((item, idx) => (
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
                  isBookmarked={bookmarkedPostIds?.includes(item.id)}
                />
              </Fragment>
            ))
          ) : (
            <p className={S.emptyMessage}>
              아직 북마크한 여행지가 없어요.<br /> 마음에 드는 여행지를 북마크해 보세요!
            </p>
          )}
        </div>
      </section>
    </>
  );  
}

export default Curation;
