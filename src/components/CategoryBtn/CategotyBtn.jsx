import { useId } from 'react';
import S from './CategoryBtn.module.css';

function CategoryBtn({ label }) {
  const id = useId();
  return (
    <div className={S.component}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="radio" name="category" value={label} />
    </div>
  );
}
export default CategoryBtn;
