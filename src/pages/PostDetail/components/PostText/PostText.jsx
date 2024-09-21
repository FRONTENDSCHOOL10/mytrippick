import Plus from '@/assets/svg/plus.svg?react';
import { string } from 'prop-types';
import { useState, useEffect } from 'react';
import S from './PostText.module.css';

PostText.propTypes = {
  children: string,
};

function PostText({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setShowButton(children && children.length > 150);
    setIsExpanded(false);
  }, [children]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  if (!children) return null;

  return (
    <section className={S.postText}>
      <p className="body1">
        {isExpanded
          ? children
          : children.slice(0, 150) + (showButton ? '...' : '')}
      </p>
      {showButton && (
        <button className={S.btn} onClick={handleToggle}>
          {isExpanded ? '접기' : '더보기'}
          {!isExpanded && <Plus />}
        </button>
      )}
    </section>
  );
}

export default PostText;
