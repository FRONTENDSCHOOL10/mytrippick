import { string } from 'prop-types';
import { useState } from 'react';
import S from './PostText.module.css';
import Plus from '@/assets/svg/plus.svg?react';

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
      <>
        <p>
          {isExpanded
            ? children
            : children.slice(0, 150) + (children.length > 150 ? '...' : '')}
        </p>
        <button className={S.btn} onClick={handleToggle}>
          {isExpanded ? '접기' : '더보기'}
          {isExpanded ? '' : <Plus />}
        </button>
      </>
    );
  }
}

export default PostText;
