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
}) {
  const id = useId();

  const textAreaSize = small ? S.smallTextArea : S.largeTextArea;
  return (
    <article className={S.component}>
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
      />
    </article>
  );
}
export default AppTextArea;