import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import pb from '@/api/pb';
import Card from '../Card/Card';
import S from './Modal.module.css';

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

function Modal({ id, onClose }) {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const post = await pb.collection('posts').getOne(id);
        setPostData(post);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostData();

    // ESC 키를 눌렀을 때 모달을 닫는 이벤트 핸들러
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [id, onClose]);

  return (
    <div className={S.modalOverlay}>
      <div className={S.modalContent}>
        {postData ? (
          <Card
            type="post"
            id={postData.id}
            photo={postData.photo}
            placePosition={postData.placePosition}
            placeName={postData.placeName}
            likedNum={postData.likedNum || 0}
            collectionId={postData.collectionId}
            userId={postData.userId}
          />
        ) : (
          <p>데이터를 불러오는 중입니다...</p>
        )}
      </div>
    </div>
  );
}

export default Modal;
