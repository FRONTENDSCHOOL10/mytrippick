import CategoryBtn from '@/components/CategoryBtn/CategotyBtn';
import { func } from 'prop-types';
import S from './CategoryBtnList.module.css';

CategoryBtnList.propTypes = {
  onChecked: func,
};

function CategoryBtnList({ onChecked }) {
  const categories = ['여행', '문화생활', '카페', '맛집', '자연', '액티비티'];

  const handleChecked = () => {
    onChecked?.();
  };

  return (
    <article className={S.component}>
      <span className="label">카테고리</span>
      <ul className={S.categoryList}>
        {categories.map((items, index) => {
          let checked;
          if (index === 0) {
            checked = true;
          } else {
            checked = false;
          }
          return (
            <li className={S.categoryItems} key={index}>
              <CategoryBtn
                label={items}
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
