import CommonBtn from '@/components/CommonBtn/CommonBtn';
import S from './MyPage.module.css';
import Settings from '@/assets/svg/settings.svg?react';

function MyPage() {
  const noPost = false; // 임시 조건 처리, 배열 데이터의 길이가 0이면 true가 되는 식으로...

  const handleClickProfile = (e) => {
    console.log(e.currentTarget.src);

    // 누르면 프사 크게 볼 수 있는 기능...
  };
  const handleClickNewPost = () => {
    location.href = '/게시글작성'; // 게시글 작성 페이지로 이동
  };
  const handleClickLogout = () => {
    location.href = '/'; // replace로 뒤로가기 안 먹히게 하는 게 나을지?
    // 로그아웃 처리도 해주기
  };

  return (
    <>
      <h1 className="a11yHidden">마이페이지</h1>
      <section className={S.profileContainer}>
        <div className={S.profile} role="group">
          <img
            src="https://placehold.co/100"
            alt="닉네임 프로필"
            onClick={handleClickProfile}
          />
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
        <a href="/회원정보수정">
          {/* 회원 정보 수정 페이지로 이동 */}
          <Settings />
        </a>
      </section>
      <section>
        <h2 className={`headline4 ${S.visitedPlace}`}>내가 방문한 여행지</h2>
        {noPost ? (
          <div className={S.noPost}>
            <p className="body2">
              아직 여행지 기록이 없네요. <br />
              멋진 여행을 다녀오셨다면, 첫 기록을 남겨보세요!
            </p>
            <CommonBtn small onClick={handleClickNewPost}>
              여행 기록 작성하러 가기
            </CommonBtn>
            {/* 클릭 시 게시글 작성 페이지로 이동 */}
          </div>
        ) : (
          <div className={S.postContainer}>
            {/* 이 안에 리스트렌더링*/}
            {/* 아래는 확인용 임시 이미지 목록 */}
            {/* 링크는 각 게시글 상세페이지로 연결되도록, 이미지 대체텍스트는 장소 데이터를 넣기? */}
            <a href="/">
              <img src="https://placehold.co/220x310" alt="" />
            </a>
            <a href="/">
              <img src="https://placehold.co/220x310" alt="" />
            </a>
            <a href="/">
              <img src="https://placehold.co/220x310" alt="" />
            </a>
            <a href="/">
              <img src="https://placehold.co/220x310" alt="" />
            </a>
            <a href="/">
              <img src="https://placehold.co/220x310" alt="" />
            </a>
            <a href="/">
              <img src="https://placehold.co/220x310" alt="" />
            </a>
            <a href="/">
              <img src="https://placehold.co/220x310" alt="" />
            </a>
          </div>
        )}
      </section>
      <section className={S.logout}>
        <CommonBtn small onClick={handleClickLogout}>
          로그아웃
        </CommonBtn>
        {/* 로그아웃 후 메인페이지로 이동하도록? */}
      </section>
    </>
  );
}

export default MyPage;
