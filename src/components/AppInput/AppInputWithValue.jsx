import { useId } from 'react';
import S from './AppInputWithValue.module.css';

function AppInputWithValue({
  label = '',
  labelHidden = false,
  type = 'text',
  name = '',
  placeholder = '',
  value = '',
  onChange,
  isRequired = true,
  isPencilOn = false,
}) {
  const id = useId();
  return (
    <article className={S.component}>
      <label htmlFor={id} hidden={labelHidden}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={isRequired}
      />
      <button type="button" hidden={isPencilOn}></button>
    </article>
  );
}
export default AppInputWithValue;
