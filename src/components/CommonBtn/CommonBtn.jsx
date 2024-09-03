import { func, bool, node } from 'prop-types';
import S from './CommonBtn.module.css';
import clsx from 'clsx';

CommonBtn.propTypes = {
  submit: bool,
  reset: bool,
  disabled: bool,
  small: bool,
  fill: bool,
  children: node.isRequired,
  handleClick: func,
};

function CommonBtn({
  submit = false,
  reset = false,
  disabled = false,
  small = false,
  fill = false,
  children,
  handleClick,
}) {
  let type = 'button';
  if (submit) type = 'submit';
  if (reset) type = 'reset';

  const btnClass = clsx(S.btn, {
    [S.smBtn]: small === true,
    [S.lgBtn]: small === false,
    [S.outline]: fill === false,
    [S.fill]: fill === true,
  });

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={btnClass}
    >
      {children}
    </button>
  );
}

export default CommonBtn;
