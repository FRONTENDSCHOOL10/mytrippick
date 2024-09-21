import { string, func } from 'prop-types';
import CategoryBtn from '@/components/CategoryBtn/CategotyBtn';
import S from './CategoryList.module.css';

CategoryList.propTypes = {
  selectedCategory: string,
  onCategoryChange: func,
};

function CategoryList({ selectedCategory, onCategoryChange }) {
  const categories = ['여행', '문화생활', '카페', '맛집', '자연', '액티비티'];

  return (
    <article className={S.component}>
      <h3 className="sr-only">카테고리 리스트 모음</h3>
      <span className="label">카테고리 수정</span>
      <ul className={S.categoryList}>
        {categories.map((item, index) => {
          return (
            <li className={S.categoryItems} key={index}>
              <CategoryBtn
                label={item}
                checked={selectedCategory === item}
                onChecked={onCategoryChange}
              />
            </li>
          );
        })}
      </ul>
    </article>
  );
}
export default CategoryList;
