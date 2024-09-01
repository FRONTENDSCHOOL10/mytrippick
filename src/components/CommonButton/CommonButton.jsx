import { func, bool, oneOf, node } from 'prop-types';
import S from './CommonButton.module.css';
import clsx from 'clsx';

CommonButton.propTypes = {
  handleClick: func,
  disabled: bool,
  type: oneOf(['button', 'submit', 'reset']),
  children: node.isRequired,
};

function CommonButton({
  type = 'button',
  handleClick,
  disabled = false,
  children,
}) {
  const buttonClass = clsx(S.button, {
    [S.default]: type === 'button' || type === 'reset',
    [S.submit]: type === 'submit',
    [S.disabled]: disabled === true,
  });

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={buttonClass}
    >
      {children}
    </button>
  );
}

export default CommonButton;
