import { useId } from 'react';
import { string, func, bool } from 'prop-types';
import S from './AppTextArea.module.css';

AppTextArea.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  small: bool,
  defaultValue: string,
  placeholder: string,
  onChange: func,
};

function AppTextArea({
  label = '',
  name = '',
  small = true,
  defaultValue = '',
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
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        {...restProps}
      />
    </article>
  );
}
export default AppTextArea;
