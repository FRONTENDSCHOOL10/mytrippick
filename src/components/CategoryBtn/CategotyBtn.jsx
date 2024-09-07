import { useId } from 'react';
import S from './CategoryBtn.module.css';

function CategoryBtn({ label, checked = false, onChecked }) {
  const id = useId();
  return (
    <div className={S.component}>
      <input
        id={id}
        type="radio"
        name="category"
        value={label}
        defaultChecked={checked}
        onClick={onChecked}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
export default CategoryBtn;
