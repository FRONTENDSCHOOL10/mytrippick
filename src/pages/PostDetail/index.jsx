import { useParams } from 'react-router-dom';
import S from './PostDetail.module.css';

const PostDetailPage = () => {
  const { id } = useParams();

  return (
    <section className={S.container}>
      <h1>게시글 상세 페이지</h1>
      <p>게시글 ID: {id}</p>
    </section>
  );
};

export default PostDetailPage;
