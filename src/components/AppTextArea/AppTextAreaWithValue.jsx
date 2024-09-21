import { useId } from 'react';
import { string, func, bool } from 'prop-types';
import S from './AppTextAreaWithValue.module.css';

AppTextAreaWithValue.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  small: bool,
  value: string,
  placeholder: string,
  onChange: func,
};

function AppTextAreaWithValue({
  label = '',
  name = '',
  small = true,
  value = '',
  placeholder = '',
  onChange,
  ...restProps
}) {
  const id = useId();

  const textAreaSize = small ? S.smallTextArea : S.largeTextArea;

  return (
    <article className={S.component}>
      <h3 className="sr-only">{label}작성 영역</h3>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className={textAreaSize}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...restProps}
      />
    </article>
  );
}
export default AppTextAreaWithValue;
