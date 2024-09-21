import { useId } from 'react';
import S from './CategoryBtn.module.css';
import { string, bool, func } from 'prop-types';

CategoryBtn.propTypes = {
  label: string.isRequired,
  checked: bool,
  onChecked: func,
};

function CategoryBtn({ label, checked = false, onChecked }) {
  const id = useId();

  const handleChange = () => {
    onChecked?.(label);
  };

  return (
    <div className={S.component}>
      <input
        id={id}
        type="radio"
        name="category"
        value={label}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
export default CategoryBtn;
