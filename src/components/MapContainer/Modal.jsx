import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import pb from '@/api/pb';
import Card from '../Card/Card';
import S from './Modal.module.css';
import AppSpinner from '../AppSpinner/AppSpinner';

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
    <div className={S.modalOverlay} onClick={onClose}>
      <div className={S.modalContent} onClick={(e) => e.stopPropagation()}>
        {postData ? (
          <Card
            type="post"
            id={postData.id}
            postId={postData.id}
            photo={postData.photo}
            collectionId={postData.collectionId}
            likedNum={postData.likedNum || 0}
            placeName={postData.placeName}
            placePosition={postData.placePosition}
            userId={postData.userId}
            className={S.postComponentInModal}
          />
        ) : (
          <AppSpinner />
        )}
      </div>
    </div>
  );
}

export default Modal;
