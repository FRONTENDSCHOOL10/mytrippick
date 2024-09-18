import pb from '@/api/pb';
import FilledMarker from '@/assets/svg/filledMarker.svg?react';
import AppInput from '@/components/AppInput/AppInput';
import ToggleBtn from '@/components/ToggleBtn/ToggleBtn';
import UserProfile from '@/components/UserProfile/UserProfile';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommonBtn from './../../components/CommonBtn/CommonBtn';
import MoreBtn from './MoreBtn';
import S from './PostDetail.module.css';
import ReviewMoreBtn from './ReviewMoreBtn';
import getPbImageURL from '@/api/getPbImageURL';
import AppSpinner from '@/components/AppSpinner/AppSpinner';

// 해야할 일
// 1. 수정하기/삭제하기 동작 기능까지 설정할 것
// 2. 게시글 내용이 길 때만 더보기가 나타나도록 조정/더보기 버튼 동작
// 3. 댓글 작성/불러오기/수정/삭제

const PostDetailPage = () => {
  const [userData, setUserData] = useState({});
  const [postData, setPostData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState(null);

  const { id } = useParams();
  const postId = id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 데이터 가져오기
        const postData = await pb.collection('posts').getOne(postId);
        const userId = postData.userId;
        const userData = await pb.collection('users').getOne(userId);

        setPostData(postData);
        setUserData(userData);
        setIsLoading(false);
      } catch (error) {
        // 에러 처리
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <AppSpinner />;
  }

  const profileImage = getPbImageURL(userData, 'userProfile');
  const postImage = getPbImageURL(postData);
  const contentsLength = postData.contents ? postData.contents.length : 0;

  console.log(contentsLength);

  const noComment = false; // 임시 조건 처리

  return (
    <>
      <h1 className="a11yHidden">게시글 상세 페이지</h1>
      <section className={S.photoBox}>
        <div role="group" className={S.onPhoto}>
          <UserProfile avatarUrl={profileImage} userName={userData.nickName} />
          <MoreBtn />
          {/* 버튼 기능 추가 필요 - 해당 컴포넌트 파일에서 */}
        </div>
        <img src={postImage} alt="" />
      </section>
      <section className={S.postInfo}>
        <div role="group" className={`caption ${S.placeInfo}`}>
          <FilledMarker /> {postData.placePosition} • {postData.category}
        </div>
        <div role="group" className={S.toggleBox}>
          <ToggleBtn />
          <ToggleBtn bookmark />
        </div>
      </section>
      <section className={S.postText}>
        <p className="body1">{postData.contents}</p>
        {contentsLength >= 150 ? <ReviewMoreBtn /> : null}
      </section>
      <section className={S.commentContainer}>
        <span>댓글 0</span>
        {noComment ? (
          <p className={S.noComment}>첫 댓글을 남겨보세요.</p>
        ) : (
          <ul className={S.commentList}>
            <li>
              <img src="https://placehold.co/100" alt="" />
              <div role="group" className={S.comment}>
                <div role="group" className={S.nickName}>
                  <p>닉네임</p>
                  <MoreBtn small />
                </div>
                <p className="body3">
                  댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글
                  내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다.
                  댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다.
                </p>
                <span className={S.commentDate}>날짜</span>
              </div>
            </li>
            <li>
              <img src="https://placehold.co/100" alt="" />
              <div role="group" className={S.comment}>
                <div role="group" className={S.nickName}>
                  <p>닉네임</p>
                  <MoreBtn small />
                </div>
                <p className="body3">
                  댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글
                  내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다.
                  댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다.
                </p>
                <span className={S.commentDate}>날짜</span>
              </div>
            </li>
            <li>
              <img src="https://placehold.co/100" alt="" />
              <div role="group" className={S.comment}>
                <div role="group" className={S.nickName}>
                  <p>닉네임</p>
                  <MoreBtn small />
                </div>
                <p className="body3">
                  댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글
                  내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다.
                  댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다.
                </p>
                <span className={S.commentDate}>날짜</span>
              </div>
            </li>
          </ul>
        )}
      </section>
      <section className={S.addComment}>
        <AppInput
          label="댓글 입력"
          placeholder="댓글을 입력해주세요"
        ></AppInput>
        <CommonBtn fill disabled>
          등록
        </CommonBtn>
        {/* 코멘트 입력 시 버튼 활성화되는 기능 필요 */}
      </section>
    </>
  );
};

export default PostDetailPage;
