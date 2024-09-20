import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import CategoryTab from './components/CategoryTab/CategoryTab';
import RankList from './components/CardList/RankList';
import PostList from './components/CardList/PostList';

import BasicTextModal from '@/components/BasicTextModal/BasicTextModal';
import useModalStore from '@/stores/useModalStore';
import { useNavigate } from 'react-router-dom';
import { formatTextWithBreaks } from '@/utils';

import AppHelmet from '@/components/AppHelmet/AppHelmet';
import S from './Home.module.css';

export function Component() {
  const showModal = useModalStore((state) => state.showModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const navigate = useNavigate();

  // 모달 '로그인' 버튼 클릭 시 로그인 페이지로 이동
  const handleLoginRedirect = () => {
    closeModal(); // 모달 닫기
    navigate('/login'); // 로그인 페이지로 이동
  };

  // 모달 메시지
  const message = formatTextWithBreaks(
    '로그인 이후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?'
  );

  return (
    <>
      <AppHelmet title={'마이트립픽'} />
      <h1 className={`headline4 ${S.sectionTitle}`}>인기 여행지 TOP 3</h1>
      {/* 인기 여행지 TOP 3 */}
      <RankList />
      {/* 카테고리 탭 */}
      <CategoryTab />
      {/* 게시글 리스트 */}
      <PostList />

      {/* 모달 렌더링 */}
      {showModal && (
        <BasicTextModal
          type="both"
          message={message}
          fillBtnText="로그인"
          btnText="닫기"
          onFillBtnClick={handleLoginRedirect} // 로그인 페이지로 이동
          onBtnClick={closeModal} // 모달 닫기
        />
      )}
    </>
  );
}
