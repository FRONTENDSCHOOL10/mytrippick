import CommonBtn from '@/components/CommonBtn/CommonBtn';
import S from './MyPage.module.css';
import Settings from '@/assets/svg/settings.svg?react';

function MyPage() {
  const noPost = false; // 임시 조건 처리

  return (
    <>
      <h1 className="a11yHidden">마이페이지</h1>
      <section className={S.profileContainer}>
        <div className={S.profile} role="group">
          <img src="https://placehold.co/100" alt="닉네임 프로필" />
          <div className={S.profileText} role="group">
            <h2 className="headline4">
              닉네임최대닉네임최대닉네임최대닉네임최대
            </h2>
            <p>
              소개글최대소개글최대소개글최대소개글최대소개글최대소개글최대소개글최대
              소개글최대
            </p>
          </div>
        </div>
        <button>
          <Settings />
        </button>
      </section>
      <section>
        <h2 className={`headline4 ${S.visitedPlace}`}>내가 방문한 여행지</h2>
        {noPost ? (
          <div className={S.noPost}>
            <p className="body2">
              아직 여행지 기록이 없네요. <br />
              멋진 여행을 다녀오셨다면, 첫 기록을 남겨보세요!
            </p>
            <CommonBtn small>여행 기록 작성하러 가기</CommonBtn>
          </div>
        ) : (
          <div className={S.postContainer}>
            {/* 이 안에 리스트렌더링 */}
            {/* 아래는 확인용 임시 이미지 */}
            <img src="https://placehold.co/220x310" alt="" />
            <img src="https://placehold.co/220x310" alt="" />
            <img src="https://placehold.co/220x310" alt="" />
            <img src="https://placehold.co/220x310" alt="" />
            <img src="https://placehold.co/220x310" alt="" />
            <img src="https://placehold.co/220x310" alt="" />
            <img src="https://placehold.co/220x310" alt="" />
          </div>
        )}
      </section>
      <section className={S.logout}>
        <CommonBtn small>로그아웃</CommonBtn>
      </section>
    </>
  );
}

export default MyPage;
