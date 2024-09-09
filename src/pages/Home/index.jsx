import Card from '@/components/Card/Card';
import { Helmet } from 'react-helmet-async';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import data from '@/data/dummyData.json';
import S from './Home.module.css';
import CategoryBtn from '@/components/CategoryBtn/CategotyBtn';

function Home() {
  console.log(data);
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
      <h1 className={`headline4 ${S.sectionTitle}`}>인기 여행지 랭킹 TOP 3</h1>
      <Swiper
        className={S.rankList}
        slidesPerView="auto"
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {data.data?.map((item, idx) => (
          <SwiperSlide key={idx}>
            <Card
              type="rank"
              thumbnailImg={item.thumbnailImg}
              userImg={item.userImg}
              userName={item.userName}
              likedNum={item.likedNum}
              title={item.title}
              location={item.location}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <CategoryBtn />
      <section className={S.postList}>
        {data.data?.map((item, idx) => (
          <Card
            type="post"
            className={S.card}
            key={idx}
            thumbnailImg={item.thumbnailImg}
            title={item.title}
            location={item.location}
          />
        ))}
      </section>
    </>
  );
}
export default Home;
