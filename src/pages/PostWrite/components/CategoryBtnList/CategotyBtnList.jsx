import CategoryBtn from '@/components/CategoryBtn/CategotyBtn';
import { func } from 'prop-types';
import S from './CategoryBtnList.module.css';
import { useState } from 'react';

CategoryBtnList.propTypes = {
  onChecked: func,
};

function CategoryBtnList({ onChecked }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = ['여행', '문화생활', '카페', '맛집', '자연', '액티비티'];

  const handleChecked = (value) => {
    setSelectedCategory(value);
    onChecked?.(value);
  };

  return (
    <article className={S.component}>
      <h3 className="sr-only">카테고리 리스트 모음</h3>
      <span className="label">카테고리</span>
      <ul className={S.categoryList}>
        {categories.map((item, index) => {
          const checked = item === selectedCategory;
          return (
            <li className={S.categoryItems} key={index}>
              <CategoryBtn
                label={item}
                checked={checked}
                onChecked={handleChecked}
              />
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default CategoryBtnList;
