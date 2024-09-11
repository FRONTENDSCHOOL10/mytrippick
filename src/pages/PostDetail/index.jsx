import { useParams } from 'react-router-dom';
import S from './PostDetail.module.css';
import UserProfile from '@/components/UserProfile/UserProfile';
import MoreBtn from './MoreBtn';
import FilledMarker from '@/assets/svg/filledMarker.svg?react';
import ToggleBtn from '@/components/ToggleBtn/ToggleBtn';
import ReviewMoreBtn from './ReviewMoreBtn';
import CommonBtn from './../../components/CommonBtn/CommonBtn';
import AppInput from '@/components/AppInput/AppInput';

const PostDetailPage = () => {
  const { id } = useParams();
  console.log(id);

  const noComment = false; // 임시 조건 처리

  return (
    <>
      <h1 className="a11yHidden">게시글 상세 페이지</h1>
      <section className={S.photoBox}>
        <img src="https://placehold.co/400x600" alt="" />
        <div role="group" className={S.onPhoto}>
          <UserProfile
            avatarUrl="https://placehold.co/100/000000/fff"
            userName="유저닉네임"
          />
          <MoreBtn />
          {/* 버튼 기능 추가 필요 - 해당 컴포넌트 파일에서 */}
        </div>
      </section>
      <section className={S.postInfo}>
        <div role="group" className={`caption ${S.placeInfo}`}>
          <FilledMarker /> 장소 • 카테고리
        </div>
        <div role="group" className={S.toggleBox}>
          {/* 토글 버튼 크기 조정 필요해보임 */}
          <ToggleBtn />
          <ToggleBtn bookmark />
        </div>
      </section>
      <section className={S.postText}>
        <p className="body1">
          후기 내용입니다. 후기 내용입니다. 후기 내용입니다. 후기 내용입니다.
          후기 내용입니다. 후기 내용입니다. 후기 내용입니다. 후기 내용입니다.
          후기 내용입니다. 후기 내용입니다. 후기 내용입니다. 후기 내용입니다.
        </p>
        <ReviewMoreBtn />
        {/* 더보기 버튼 기능 필요 */}
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
