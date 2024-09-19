import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import CategoryTab from './components/CategoryTab/CategoryTab';
import RankList from './components/CardList/RankList';
import PostList from './components/CardList/PostList';

import { Helmet } from 'react-helmet-async';
import S from './Home.module.css';

export function Component() {
  return (
    <>
      <Helmet>
        <title>마이트립픽</title>
        <meta
          name="description"
          content="나만의 인생 여행지를 올려 다른 사람들과 공유하고, 가장 높은 순위를 가진 여행지를 선정해 보세요."
        />
        <meta property="og:title" content="마이트리픽" />
        <meta property="og:type" content="site" />
        <meta
          property="og:description"
          content="나만의 인생 여행지를 올려 다른 사람들과 공유하고, 가장 높은 순위를 가진 여행지를 선정해 보세요."
        />
        <meta property="og:site:author" content="리액트에서-구해조" />
      </Helmet>
      <h1 className={`headline4 ${S.sectionTitle}`}>인기 여행지 TOP 3</h1>
      {/* 인기 여행지 TOP 3 */}
      <RankList />
      {/* 카테고리 탭 */}
      <CategoryTab />
      {/* 게시글 리스트 */}
      <PostList />
    </>
  );
}
