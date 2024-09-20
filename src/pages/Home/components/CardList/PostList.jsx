import { useQuery } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import useHomeStore from '@/stores/useHomeStore';
import Card from '@/components/Card/Card';
import CommonBtn from '@/components/CommonBtn/CommonBtn';
import pb from '@/api/pb';

import S from './CardList.module.css';

export default function PostList() {
  const [postCardList, setPostCardList] = useState([]);
  const page = useHomeStore((state) => state.page);
  const selectedCategory = useHomeStore((state) => state.selectedCategory);
  const setPage = useHomeStore((state) => state.setPage);

  const postData = useQuery({
    queryKey: ['posts', page, selectedCategory],
    queryFn: async () => {
      const filter =
        selectedCategory !== '전체' ? `category="${selectedCategory}"` : '';
      const result = await pb.collection('posts').getList(page, 8, {
        sort: '-created',
        filter: filter,
      });
      const newItems = result.items || [];
      setPostCardList((prevList) =>
        page === 1 ? newItems : [...prevList, ...newItems]
      );
      return result;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  // console.log("게시글 데이터:", postData.data);
  // console.log("현재 postCardList:", postCardList);

  return (
    <section className={S.post}>
      {/* {error && <p className={`body1 ${S.error}`}>{error}</p>} */}
      <div className={S.postCardList}>
        {postCardList?.map((item, idx) => {
          return (
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
          );
        })}
      </div>
      {postCardList.length > 0 &&
        postCardList.length !== postData.data?.totalItems && (
          <CommonBtn
            small
            onClick={() => setPage(page + 1)}
            disabled={postData.isFetching}
          >
            더보기
          </CommonBtn>
        )}
    </section>
  );
}
