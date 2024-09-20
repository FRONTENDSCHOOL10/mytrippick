import Plus from '@/assets/svg/plus.svg?react';
import { string } from 'prop-types';
import { useState } from 'react';
import S from './PostText.module.css';

PostText.propTypes = {
  children: string,
};

function PostText({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  if (children) {
    return (
      <section className={S.postText}>
        <p className="body1">
          {isExpanded
            ? children
            : children.slice(0, 150) + (children.length > 150 ? '...' : '')}
        </p>
        <button className={S.btn} onClick={handleToggle}>
          {isExpanded ? '접기' : '더보기'}
          {isExpanded ? '' : <Plus />}
        </button>
      </section>
    );
  }
}

export default PostText;
